const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_SHEETS_API_KEY')
    const sheetId = Deno.env.get('GOOGLE_SHEET_ID')

    if (!apiKey || !sheetId) {
      return new Response(
        JSON.stringify({ error: 'Missing Google Sheets configuration' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch data from Google Sheets API (Sheet1, columns A-D: name, city, address, phone)
    const range = encodeURIComponent('Sheet1!A:D')
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`

    const response = await fetch(url)
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Sheets API error:', response.status, errorText)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch store locations' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const data = await response.json()
    const rows = data.values || []

    // Skip header row, group by city
    const cityMap: Record<string, Array<{ name: string; address?: string; phone?: string }>> = {}

    for (let i = 1; i < rows.length; i++) {
      const [name, city, address, phone] = rows[i]
      if (!name || !city) continue

      if (!cityMap[city]) {
        cityMap[city] = []
      }
      cityMap[city].push({
        name: name.trim(),
        ...(address?.trim() ? { address: address.trim() } : {}),
        ...(phone?.trim() ? { phone: phone.trim() } : {}),
      })
    }

    const result = Object.entries(cityMap).map(([city, stores]) => ({
      city,
      stores,
    }))

    return new Response(
      JSON.stringify(result),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300',
        },
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
