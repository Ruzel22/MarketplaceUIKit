// Импорт модуля dotenv для работы с переменными окружения
import dotenv from 'dotenv'
// Импорт модуля path для работы с путями файлов
import path from "path" 
import type {InitOptions} from 'payload/config'
import payload from 'payload'

// Загрузка переменных окружения из файла .env, который находится в директории выше текущей директории
dotenv.config({
  path: path.resolve(__dirname, "../.env")
})

// Создание глобального объекта payload, который будет кэшировать клиента Payload и промис инициализации клиента
let cached = (global as any).payload
// Если этот объект уже существует, он не будет пересоздан
if(!cached){
  cached = (global as any).payload = {
    client: null,
    promise: null
  }
}

// Определение интерфейса Args, который будет использоваться в функции getPayloadClient
interface Args {
  initOptions?: Partial<InitOptions>
}

// Функция getPayloadClient, которая возвращает кэшированный клиент Payload, если он существует
export const getPayloadClient = async ({initOptions}: Args = {}) => {
  // Если переменная окружения PAYLOAD_SECRET не установлена, будет выброшено исключение
  if(!process.env.PAYLOAD_SECRET){
    throw new Error("PAYLOAD_SECRET is missing")
  }

  // Если клиент Payload уже кэширован, он просто возвращается
  if(cached.client){
    return cached.client
  }

  // Если промис инициализации клиента еще не создан, оно создается
  if(!cached.promise){
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  // Попытка выполнить промис инициализации клиента
  try{
    cached.client = await cached.promise
  }catch(e: unknown){
    // Если инициализация не удается, промис обнуляется, и ошибка перебрасывается
    cached.promise = null
    throw e
  }
  // Возвращение кэшированного клиента
  return cached.client
}
