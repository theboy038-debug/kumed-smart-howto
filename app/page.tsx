import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { PageContainer } from "@/components/layout/page-container";
import { FloorCard } from "@/components/navigation/floor-card";
import { APP_CONFIG } from "@/lib/config/facility";
import { getAllFloors } from "@/lib/utils";

export default function HomePage() {
  const floors = getAllFloors();

  return (
    <>
      <AppHeader title={APP_CONFIG.productName} />
      <PageContainer className="gap-5 pt-5">
        <p className="text-muted">คุณอยู่ชั้นไหน?</p>
        <ul className="flex flex-col gap-3">
          {floors.map((floor) => (
            <li key={floor.id}>
              <FloorCard floor={floor} />
            </li>
          ))}
        </ul>
      </PageContainer>
      <AppFooter />
    </>
  );
}
