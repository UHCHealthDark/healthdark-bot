type colorType = "text" | "error"

export class ColorUtil {
  private static readonly colors = {
    text: 0x0F0F0F0,
    error: 0x0F0F0F0
  };

  public static getColor(color: colorType) {
    return this.colors[color]
  }
}