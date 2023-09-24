interface SerializedClass {
  name: string;
  hitDiceValue: number;
  classLevel: number;
}

interface SerializedStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

interface SerializedModifier {
  affectedObject: string;
  affectedValue: string;
  value: number;
}

interface SerializedItem {
  name: string;
  modifier: SerializedModifier;
}

export interface SerializedDefense {
  type: string;
  defense: string;
}

export interface InitialSerializedCharacter {
  name: string;
  level: number;
  hitPoints: number;
  classes: SerializedClass[];
  stats: SerializedStats;
  items: SerializedItem[];
  defenses: SerializedDefense[];
}
