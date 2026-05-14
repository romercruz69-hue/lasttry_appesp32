# IoT SaaS Platform (Blynk-inspired)

Production-grade full-stack IoT platform with secure ESP32 onboarding, real-time control, telemetry storage in Supabase, and deployable backend.

## Structure
- `backend/` Express + TypeScript + Socket.IO + MQTT + JWT + Supabase
- `mobile-app/` React Native (Expo Router) + Zustand + React Query + Reanimated-ready UI
- `esp32/` Arduino firmware example
- `render.yaml` Render deployment config

## API Highlights
- `POST /api/auth/register|login|refresh|logout`
- `GET/POST/PUT/DELETE /api/devices`
- `GET /api/telemetry/:deviceId`, `POST /api/telemetry`
- `POST /api/devices/:id/command`
- `GET/POST/PUT/DELETE /api/dashboards`

## Security Design
- User JWT access + refresh token model
- Per-device random token generated at onboarding
- Device token stored as SHA-256 hash in `device_credentials`
- MQTT + WebSocket auth gates, heartbeat, and online state updates
- Helmet, CORS allowlist, rate limiting, centralized error handling

## Supabase
Run migration in `backend/supabase/migrations/0001_schema.sql`.

## Render
Deploy via `render.yaml` and set all secrets from `backend/.env.example`.
