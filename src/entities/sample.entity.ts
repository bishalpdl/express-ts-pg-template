import { Column, Entity } from "typeorm";
import { CustomBaseEntity } from "./base-entity";

@Entity({
  name: "sample",
})
export class SampleEntity extends CustomBaseEntity {
  @Column()
  sample_int_field: number;

  @Column()
  sample_string_field: string;
}
