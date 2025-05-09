import Cloudy from '../assets/weather/cloudy.png'
import Fog from '../assets/weather/fog.png'
import Hail from '../assets/weather/hail.png'
import PartlyCloudy from '../assets/weather/partly_cloudy.png'
import PartlySunny from '../assets/weather/partly_sunny.png'
import Rainy from '../assets/weather/rainy.png'
import Snow from '../assets/weather/snow.png'
import Sunny from '../assets/weather/sunny.png'
import ThunderRain from '../assets/weather/thunder_rain.png'
import Thunderstorm from '../assets/weather/thunderstorm.png'
import Unkown from '../assets/weather/unkown.png'

const weatherTypeImages: Record<number, string> = {
  1: Sunny,
  2: PartlyCloudy,
  19: Thunderstorm,
  ...Object.fromEntries([3, 25].map((id) => [id, PartlySunny])),
  ...Object.fromEntries([4, 5, 24, 27].map((id) => [id, Cloudy])),
  ...Object.fromEntries([6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((id) => [id, Rainy])),
  ...Object.fromEntries([16, 17, 26].map((id) => [id, Fog])),
  ...Object.fromEntries([18, 22].map((id) => [id, Snow])),
  ...Object.fromEntries([20, 23].map((id) => [id, ThunderRain])),
  ...Object.fromEntries([21, 28, 29, 30].map((id) => [id, Hail])),
}

/**
 * Maps a weather type to its corresponding weather icon image.
 *
 * @param weatherType Weather type identifier.
 * @returns A string path to the image asset.
 */
export function mapWeatherTypetoImage(weatherType: number): string {
  return weatherTypeImages[weatherType] ?? Unkown
}
