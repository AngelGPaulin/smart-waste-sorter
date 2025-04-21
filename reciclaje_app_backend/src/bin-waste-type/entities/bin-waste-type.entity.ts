import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { TrashBin } from "src/trash-bin/entities/trash-bin.entity";
import { WasteType } from "src/waste-type/entities/waste-type.entity";

@Entity()
export class BinWasteType {
  @PrimaryColumn()
  binId: string;

  @PrimaryColumn()
  wasteTypeId: string;

  @ManyToOne(() => TrashBin, (bin) => bin.wasteTypes)
  bin: TrashBin;

  @ManyToOne(() => WasteType, (wasteType) => wasteType.bins)
  wasteType: WasteType;
}
