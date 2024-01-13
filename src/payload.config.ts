import { buildConfig } from "payload/config";
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from "@payloadcms/richtext-slate";
import { BaseDatabaseAdapter } from "payload/database";
import { Payload } from "payload/dist/payload";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";


export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [],
  routes: {
    admin: '/sell'
  },
  admin: {
    bundler: webpackBundler(),
    meta: {
      titleSuffix: ' - DigitalHippo',
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg'
    }
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: postgresAdapter({
    // Postgres-specific arguments go here.
    // `pool` is required.
    pool: {
      connectionString: process.env.DATABASE_URL,
    }
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts")
  }
})

/* Этот конфигурационный файл определяет настройки для вашего проекта Payload CMS1. Вот что делает каждый из параметров:
serverURL: Это строка, используемая для определения абсолютного URL вашего приложения, включая протокол1. Например, ‘https://example.com’.
collections: Это массив всех коллекций, которые будет управлять Payload1.
routes: Этот параметр контролирует структуру маршрутизации, которую Payload привязывает к себе1. В данном случае, административный маршрут установлен на ‘/sell’.
admin: Это базовая конфигурация администратора Payload1. Здесь вы можете указать сборщик, настроить метаданные, установить коллекцию пользователей Admin и многое другое1. В данном случае, используется webpackBundler() в качестве сборщика, а также заданы некоторые метаданные.
editor: Это Rich Text Editor, который будет использоваться полями richText1. В данном случае, используется slateEditor({}).
db: Это адаптер базы данных, который будет использоваться Payload1. В данном случае, используется postgresAdapter(), который позволяет использовать PostgreSQL в качестве системы управления базами данных в вашем проекте Payload1. */