# Reporters Database Fullstack-applikasjon

Dette prosjektet er en fullstack-demonstrasjon som integrerer Free Law Reporters-databasen i en .NET-backend med en React-frontend. Prosjektet viser hvordan man laster, deserialiserer og eksponerer juridiske data via et API, samt hvordan man bygger et interaktivt brukergrensesnitt for filtrering og visning av data.

## Innhold

- [Introduksjon](#introduksjon)
- [Funksjoner](#funksjoner)
- [Teknologi](#teknologi)
- [Prosjektstruktur](#prosjektstruktur)
- [Installasjon og kjøring](#installasjon-og-kjøring)
  - [Backend (.NET API)](#backend-net-api)
  - [Frontend (React)](#frontend-react)
- [Bruk](#bruk)
- [Feilsøking](#feilsøking)
- [Bidrag](#bidrag)
- [Lisens](#lisens)
- [Kontakt](#kontakt)

## Introduksjon

Denne applikasjonen demonstrerer evnen til å utvikle en fullstack-løsning ved å:
- Laste og behandle data fra Free Law Reporters-databasen via en JSON-fil.
- Eksponere dataen via et ASP.NET Core Web API.
- Bygge et interaktivt frontend-grensesnitt med React og TypeScript der brukeren kan filtrere data.

## Funksjoner

- **Backend (API):**
  - Lasting og deserialisering av reporterdata fra JSON.
  - Eksponering av API-endepunkter for å hente alle reportere eller filtrere basert på nøkkel.
  - Håndtering av CORS for å tillate forespørsler fra React-appen.
  - Bruk av tilpasset JSON-konverter for å håndtere nullable datoer.
  
- **Frontend (React):**
  - Henting av data fra backend via HTTPS.
  - Dynamisk filtrering av data basert på brukerens inntastning.
  - Enkel og responsiv visning av data.

## Teknologi

- **Backend:**
  - .NET
  - ASP.NET Core Web API
  - System.Text.Json (med tilpasset converter)
- **Frontend:**
  - React med TypeScript
  - Fetch API for HTTP-forespørsler

## Installasjon og kjøring

### Backend (.NET API)

1. **Klon repositoryet:**

   ```
   git clone <repo-url>
   cd MyBackend
   ```
2. **Gjenopprett avhengigheter og bygg prosjektet:**

```
dotnet restore
dotnet build
```
3. **Sørg for at JSON-filen kopieres til utdata:**

Legg til følgende i MyBackend.csproj:
```
<ItemGroup>
  <None Update="data/reporters_export.json">
    <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
  </None>
</ItemGroup>
```
4. **Kjør backend:**

```
dotnet run
```

API-et vil lytte på:

- http://localhost:5000 (HTTP)
- https://localhost:5001 (HTTPS)


### Frontend (React)
1. **Gå til frontend-mappen:**
```
cd myfrontend
```
2. **Installer avhengigheter:**
```
npm install
```
3. **Start applikasjonen:**
```
npm start
```
Applikasjonen vil typisk kjøre på http://localhost:3000.


