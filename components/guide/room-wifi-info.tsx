import { Icon } from "@/components/ui/icon";
import { PENDING_WIFI_MESSAGE } from "@/lib/config/ui";
import type { Room } from "@/lib/types";

export function RoomWifiInfo({ room }: { room: Room }) {
  const wifi = room.configuration.wifi;

  if (wifi.status !== "confirmed") {
    return (
      <div className="flex items-start gap-2 rounded-xl bg-surface-elevated px-3.5 py-3 text-sm text-muted">
        <Icon name="Wifi" className="mt-0.5 h-4 w-4 shrink-0" />
        <p>{PENDING_WIFI_MESSAGE}</p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 rounded-xl bg-accent/10 px-3.5 py-3 text-sm">
      <Icon name="Wifi" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <div>
        <p>
          Wi-Fi: <span className="font-medium">{wifi.value.ssid}</span>
        </p>
        {wifi.value.password && (
          <p>
            รหัสผ่าน: <span className="font-medium">{wifi.value.password}</span>
          </p>
        )}
      </div>
    </div>
  );
}
