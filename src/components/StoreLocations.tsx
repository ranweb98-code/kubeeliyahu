import { useState, useMemo, useEffect } from "react";
import { MapPin, Phone, Search, Navigation, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/i18n/LanguageContext";

const GOOGLE_SHEETS_API_KEY = "AIzaSyB4A3A53URmkmSD3eUESMRuAms2Noa-HRw";
const SHEET_ID = "11dby0-o_K_9Eh_s824jrGJVe6dhMDZPss0qag-evmf8";
const SHEETS_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${GOOGLE_SHEETS_API_KEY}`;

interface Store { name: string; address?: string; phone?: string; }
interface CityGroup { city: string; stores: Store[]; }

const parseSheetData = (rows: string[][]): CityGroup[] => {
  const dataRows = rows.slice(1);
  const cityMap = new Map<string, Store[]>();
  for (const row of dataRows) {
    const city = row[0]?.trim();
    const name = row[1]?.trim();
    if (!city || !name) continue;
    const store: Store = { name };
    const address = row[2]?.trim();
    const phone = row[3]?.trim();
    if (address) store.address = address;
    if (phone) store.phone = phone;
    if (!cityMap.has(city)) cityMap.set(city, []);
    cityMap.get(city)!.push(store);
  }
  return Array.from(cityMap.entries()).map(([city, stores]) => ({ city, stores }));
};

const getMapsUrl = (storeName: string, address: string, city: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${storeName} ${address} ${city}`)}`;

const StoreLocations = () => {
  const [search, setSearch] = useState("");
  const [storeData, setStoreData] = useState<CityGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t, dir } = useLanguage();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch(SHEETS_URL);
        const json = await res.json();
        if (json.values && Array.isArray(json.values)) {
          setStoreData(parseSheetData(json.values));
        }
      } catch (err) {
        console.error("Failed to fetch store locations:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStores();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return storeData;
    const q = search.trim().toLowerCase();
    return storeData
      .map((group) => ({
        ...group,
        stores: group.stores.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.address?.toLowerCase().includes(q) ||
            group.city.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.stores.length > 0);
  }, [search, storeData]);

  const totalStores = storeData.reduce((sum, g) => sum + g.stores.length, 0);

  return (
    <section dir={dir} className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {t.storeLocations.title}
        </h2>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          {t.storeLocations.subtitle(totalStores)}
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10 relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder={t.storeLocations.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-10 rounded-full border-border bg-card text-foreground"
        />
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <Loader2 className="w-6 h-6 text-primary animate-spin mx-auto" />
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">{t.storeLocations.noResults(search)}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((group) => (
            <div key={group.city} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="bg-primary px-5 py-3">
                <h3 className="text-lg font-semibold text-primary-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  {group.city}
                  <span className="mr-auto text-xs font-normal opacity-80">
                    {group.stores.length} {group.stores.length === 1 ? t.storeLocations.branch : t.storeLocations.branches}
                  </span>
                </h3>
              </div>
              <ul className="divide-y divide-border">
                {group.stores.map((store, i) => (
                  <li key={i} className="px-5 py-3 hover:bg-secondary/40 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-foreground">{store.name}</p>
                        {store.address && <p className="text-xs text-muted-foreground mt-0.5">{store.address}</p>}
                        {store.phone && (
                          <a href={`tel:${store.phone.replace(/-/g, "")}`} className="text-xs text-primary font-medium mt-0.5 inline-flex items-center gap-1 hover:underline">
                            <Phone className="w-3 h-3" />
                            <span dir="ltr">{store.phone}</span>
                          </a>
                        )}
                      </div>
                      {store.address && (
                        <a href={getMapsUrl(store.name, store.address, group.city)} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 p-1.5 rounded-full hover:bg-primary/10 text-primary transition-colors" title={t.storeLocations.navigate}>
                          <Navigation className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default StoreLocations;
