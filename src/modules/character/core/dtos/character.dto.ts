import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class HitPointsDto {
  @Expose()
  @Transform(({ obj }) => obj.hitPoints.maxAmount.value)
  max: number;

  @Expose()
  @Transform(({ obj }) => obj.hitPoints.currentAmount.value)
  current: number;

  @Expose()
  @Transform(({ obj }) => obj.temporaryAmount.value)
  temporary: number;
}

@Exclude()
export class CharacterDto {
  @Expose()
  hitPoints: HitPointsDto;
}
