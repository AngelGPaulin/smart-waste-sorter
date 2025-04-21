import { CompanyWasteType } from "src/company-waste-type/entities/company-waste-type.entity";
import { WasteType } from "../entities/waste-type.entity";
import { BinWasteType } from "src/bin-waste-type/entities/bin-waste-type.entity";

export class CreateWasteTypeDto extends WasteType {
    wasteTypeId: string;
    name: string;
    companies: CompanyWasteType[];
    bins: BinWasteType[];
}
