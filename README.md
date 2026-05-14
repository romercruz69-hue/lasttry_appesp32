# IoT Nexus (Blynk-Inspired Full-Stack Platform)

A production-style IoT platform with:
- **Mobile app** (React Native + Expo, iOS + Android)
- **Backend API** (Node.js + Express + Socket.IO + MQTT)
- **Supabase PostgreSQL** data layer
- **ESP32 firmware** for secure telemetry and remote control
- **Render-ready deployment**

## 1) Monorepo Structure
- `backend/` API, auth, MQTT bridge, Socket.IO realtime
- `mobile-app/` Expo Router app with auth, dashboards, devices, settings
- `esp32/` firmware example (`firmware_example.ino`)
- `render.yaml` Render deployment

## 2) Feature Coverage
- Register, login, refresh, logout (JWT access + refresh)
- Secure device onboarding (`device_id` + secret token hash)
- Telemetry ingest (`HTTP`, `MQTT`) + realtime fanout (Socket.IO)
- Device command API (`POST /api/devices/:id/command`) -> MQTT publish
- Dashboards, widgets, rooms, logs, telemetry persistence in Supabase
- Heartbeat/online state updates

## 3) Backend API
### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`

### Devices
- `GET /api/devices`
- `POST /api/devices`
- `PUT /api/devices/:id`
- `DELETE /api/devices/:id`
- `POST /api/devices/:id/command`

### Telemetry
- `GET /api/telemetry/:deviceId`
- `POST /api/telemetry`

## 4) Database / Supabase
Run migration: `backend/supabase/migrations/0001_schema.sql`

Core tables:
- `users`
- `devices`
- `device_credentials`
- `telemetry`
- `device_logs`
- `dashboards`
- `widgets`
- `rooms`

## 5) Complete Beginner Setup Guide
### Step A — Install Requirements
1. Install Node.js LTS (v20+ recommended) from nodejs.org.
2. Install Git.
3. Install Expo CLI: `npm i -g expo` (or use `npx expo`).
4. Install Android Studio (Android tests) and/or Xcode (iOS tests, macOS).
5. Install Arduino IDE + ESP32 board package.

### Step B — Create Supabase Project
1. Create a project at supabase.com.
2. Copy:
   - Project URL
   - Service role key
   - Anon key (for optional mobile direct reads)
3. Open SQL editor and run `backend/supabase/migrations/0001_schema.sql`.

### Step C — Configure Environment Variables
Create `backend/.env`:
- `PORT=8080`
- `CLIENT_URL=http://localhost:8081`
- `JWT_ACCESS_SECRET=...`
- `JWT_REFRESH_SECRET=...`
- `SUPABASE_URL=...`
- `SUPABASE_SERVICE_ROLE_KEY=...`
- `MQTT_BROKER_URL=mqtt://broker.hivemq.com:1883` (or your broker)
- `MQTT_USERNAME=`
- `MQTT_PASSWORD=`

Create `mobile-app/.env` (or Expo public vars pattern):
- `EXPO_PUBLIC_API_URL=http://<your-lan-ip>:8080/api`
- `EXPO_PUBLIC_WS_URL=http://<your-lan-ip>:8080`

### Step D — Run Backend Locally
```bash
cd backend
npm install
npm run dev
```
Health check: `GET http://localhost:8080/health`

### Step E — Run Mobile App Locally
```bash
cd mobile-app
npm install
npm run start
```
- Press `a` for Android emulator.
- Press `i` for iOS simulator.
- Or scan QR with Expo Go.

### Step F — Test on Android Phone
1. Phone + dev machine must share Wi-Fi.
2. Set `EXPO_PUBLIC_API_URL` to your machine LAN IP.
3. Start Expo and scan QR in Expo Go.

### Step G — Connect ESP32
1. Open `esp32/firmware_example.ino`.
2. Set Wi-Fi SSID/password.
3. Set backend URL/MQTT broker.
4. Flash to device.
5. Device sends heartbeat/telemetry and subscribes to command channel.

### Step H — Deploy Backend to Render
1. Push repo to GitHub.
2. Create Render Web Service using `render.yaml`.
3. Add environment variables from `.env`.
4. Deploy and verify `/health` endpoint.

### Step I — Build Android APK
```bash
cd mobile-app
npx expo prebuild
npx expo run:android --variant release
```
For production distribution use EAS Build.

### Step J — Troubleshooting
- **401 Unauthorized:** invalid/expired access token; refresh/login.
- **No realtime updates:** verify Socket.IO URL + CORS + auth token in handshake.
- **ESP32 offline:** verify Wi-Fi, broker URL, and device token.
- **Supabase errors:** confirm migration ran and service key is correct.
- **Render crash loop:** check env vars and startup command.

## 6) UI/UX Notes
- Dark neon style with rounded cards and glassmorphism-friendly palette.
- Reanimated/Gesture Handler compatible component structure.
- Expandable dashboard builder and widget registry in `mobile-app/widgets`.

## 7) Production Hardening Checklist
- Add refresh-token rotation + revocation table
- Add email verification and password reset email provider
- Add row-level security policies in Supabase
- Add device provisioning QR flow
- Add E2E tests and CI/CD
