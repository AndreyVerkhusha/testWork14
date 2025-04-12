export type WeatherResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecast[];
  city: CityInfo;
};

type WeatherForecast = {
  main: MainWeatherData;
  weather: WeatherCondition[];
  wind: WindData;
  dt: number; // Время в формате Unix timestamp
  clouds: {
    all: number; // Облачность в процентах
  };
  visibility: number; // Видимость в метрах
  pop: number; // Вероятность осадков
  snow?: {
    '3h': number; // Количество снега за последние три часа в мм
  }; // Данные о снегопаде (опционально)
  sys: {
    pod: string; // Период дня ("d" - день, "n" - ночь)
  };
  dt_txt: string; // Дата и время в формате "YYYY-MM-DD HH:mm:ss"
};

type MainWeatherData = {
  temp: number; // Температура
  feels_like: number; // Ощущаемая температура
  temp_min: number; // Минимальная температура
  temp_max: number; // Максимальная температура
  pressure: number; // Давление в гПа
  sea_level?: number; // Давление на уровне моря (опционально)
  grnd_level?: number; // Давление на уровне земли (опционально)
  humidity: number; // Влажность в процентах
  temp_kf?: number; // Коррекция температуры (опционально)
};

type WeatherCondition = {
  id: number; // Идентификатор погодного условия
  main: string; // Основное погодное условие (например, "Snow")
  description: string; // Описание погодного условия (например, "небольшой снег")
  icon: string; // Иконка погодного условия
};

type WindData = {
  speed: number; // Скорость ветра в м/с
  deg: number; // Направление ветра в градусах
  gust?: number; // Порывы ветра (опционально)
};

type CityInfo = {
  id: number;
  name: string;
  coord: {
    lat: number; // Широта
    lon: number; // Долгота
  };
  country: string;
  population?: number; // Население
  timezone: number; // Часовой пояс в секундах от UTC
  sunrise?: number; // Время восхода солнца
  sunset?: number; // Время заката солнца
};
