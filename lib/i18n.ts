export type Language = 'en' | 'pl' | 'cz' | 'nl'

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: 'Home',
    cars: 'Cars',
    bookings: 'Bookings',
    dashboard: 'Dashboard',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Home Page
    carRentalManagement: 'Car Rental Management System',
    searchCars: 'Search Cars',
    location: 'Location',
    pickupDate: 'Pickup Date',
    returnDate: 'Return Date',
    carType: 'Car Type',
    priceRange: 'Price Range',
    availability: 'Availability',
    all: 'All',
    available: 'Available',
    rented: 'Rented',
    selectCarType: 'Select car type',
    selectPriceRange: 'Select price range',
    
    // Car Details
    bookNow: 'Book Now',
    perDay: '/day',
    features: 'Features',
    specifications: 'Specifications',
    engine: 'Engine',
    transmission: 'Transmission',
    seats: 'Seats',
    fuel: 'Fuel',
    mileage: 'Mileage',
    selectDates: 'Select Dates',
    totalPrice: 'Total Price',
    days: 'days',
    
    // Booking
    bookingDetails: 'Booking Details',
    customerName: 'Customer Name',
    customerEmail: 'Customer Email',
    confirmBooking: 'Confirm Booking',
    bookingConfirmed: 'Booking Confirmed',
    bookingCancelled: 'Booking Cancelled',
    
    // Admin
    fleetManagement: 'Fleet Management',
    addCar: 'Add Car',
    editCar: 'Edit Car',
    deleteCar: 'Delete Car',
    carName: 'Car Name',
    carModel: 'Model',
    carPrice: 'Price',
    carImage: 'Image URL',
    save: 'Save',
    cancel: 'Cancel',
    
    // Status
    pending: 'Pending',
    confirmed: 'Confirmed',
    completed: 'Completed',
    cancelled: 'Cancelled',
    maintenance: 'Maintenance',
    reserved: 'Reserved',
    
    // Damage Inspection
    damageInspection: 'Damage Inspection',
    selectArea: 'Select Area',
    damageReport: 'Damage Report',
    noDamage: 'No Damage',
    minorDamage: 'Minor Damage',
    majorDamage: 'Major Damage',
    submitReport: 'Submit Report',
    
    // Notifications
    bookingCreated: 'Booking created successfully',
    bookingUpdated: 'Booking updated successfully',
    bookingDeleted: 'Booking deleted successfully',
    carAdded: 'Car added successfully',
    carUpdated: 'Car updated successfully',
    carDeleted: 'Car deleted successfully',
  },
  pl: {
    // Navigation
    home: 'Strona główna',
    cars: 'Samochody',
    bookings: 'Rezerwacje',
    dashboard: 'Panel',
    login: 'Zaloguj',
    register: 'Zarejestruj',
    logout: 'Wyloguj',
    
    // Home Page
    carRentalManagement: 'System Zarządzania Wynajmem Samochodów',
    searchCars: 'Szukaj Samochodów',
    location: 'Lokalizacja',
    pickupDate: 'Data odbioru',
    returnDate: 'Data zwrotu',
    carType: 'Typ samochodu',
    priceRange: 'Zakres cenowy',
    availability: 'Dostępność',
    all: 'Wszystkie',
    available: 'Dostępne',
    rented: 'Wynajęte',
    selectCarType: 'Wybierz typ samochodu',
    selectPriceRange: 'Wybierz zakres cenowy',
    
    // Car Details
    bookNow: 'Zarezerwuj teraz',
    perDay: '/dzień',
    features: 'Funkcje',
    specifications: 'Specyfikacje',
    engine: 'Silnik',
    transmission: 'Skrzynia biegów',
    seats: 'Miejsca',
    fuel: 'Paliwo',
    mileage: 'Przebieg',
    selectDates: 'Wybierz daty',
    totalPrice: 'Całkowita cena',
    days: 'dni',
    
    // Booking
    bookingDetails: 'Szczegóły rezerwacji',
    customerName: 'Imię i nazwisko',
    customerEmail: 'Email klienta',
    confirmBooking: 'Potwierdź rezerwację',
    bookingConfirmed: 'Rezerwacja potwierdzona',
    bookingCancelled: 'Rezerwacja anulowana',
    
    // Admin
    fleetManagement: 'Zarządzanie flotą',
    addCar: 'Dodaj samochód',
    editCar: 'Edytuj samochód',
    deleteCar: 'Usuń samochód',
    carName: 'Nazwa samochodu',
    carModel: 'Model',
    carPrice: 'Cena',
    carImage: 'URL obrazu',
    save: 'Zapisz',
    cancel: 'Anuluj',
    
    // Status
    pending: 'Oczekujące',
    confirmed: 'Potwierdzone',
    completed: 'Zakończone',
    cancelled: 'Anulowane',
    maintenance: 'Konserwacja',
    reserved: 'Zarezerwowane',
    
    // Damage Inspection
    damageInspection: 'Kontrola uszkodzeń',
    selectArea: 'Wybierz obszar',
    damageReport: 'Raport uszkodzeń',
    noDamage: 'Brak uszkodzeń',
    minorDamage: 'Drobne uszkodzenia',
    majorDamage: 'Poważne uszkodzenia',
    submitReport: 'Prześlij raport',
    
    // Notifications
    bookingCreated: 'Rezerwacja utworzona pomyślnie',
    bookingUpdated: 'Rezerwacja zaktualizowana pomyślnie',
    bookingDeleted: 'Rezerwacja usunięta pomyślnie',
    carAdded: 'Samochód dodany pomyślnie',
    carUpdated: 'Samochód zaktualizowany pomyślnie',
    carDeleted: 'Samochód usunięty pomyślnie',
  },
  cz: {
    // Navigation
    home: 'Domů',
    cars: 'Auta',
    bookings: 'Rezervace',
    dashboard: 'Nástěnka',
    login: 'Přihlásit',
    register: 'Registrovat',
    logout: 'Odhlásit',
    
    // Home Page
    carRentalManagement: 'Systém správy pronájmu vozidel',
    searchCars: 'Hledat auta',
    location: 'Lokalita',
    pickupDate: 'Datum vyzvednutí',
    returnDate: 'Datum vrácení',
    carType: 'Typ vozu',
    priceRange: 'Cenové rozpětí',
    availability: 'Dostupnost',
    all: 'Vše',
    available: 'Dostupné',
    rented: 'Pronajaté',
    selectCarType: 'Vyberte typ vozu',
    selectPriceRange: 'Vyberte cenové rozpětí',
    
    // Car Details
    bookNow: 'Rezervovat nyní',
    perDay: '/den',
    features: 'Vlastnosti',
    specifications: 'Specifikace',
    engine: 'Motor',
    transmission: 'Převodovka',
    seats: 'Sedadla',
    fuel: 'Palivo',
    mileage: 'Nájezd',
    selectDates: 'Vyberte datumy',
    totalPrice: 'Celková cena',
    days: 'dní',
    
    // Booking
    bookingDetails: 'Detaily rezervace',
    customerName: 'Jméno zákazníka',
    customerEmail: 'Email zákazníka',
    confirmBooking: 'Potvrdit rezervaci',
    bookingConfirmed: 'Rezervace potvrzena',
    bookingCancelled: 'Rezervace zrušena',
    
    // Admin
    fleetManagement: 'Správa vozového parku',
    addCar: 'Přidat auto',
    editCar: 'Upravit auto',
    deleteCar: 'Smazat auto',
    carName: 'Název vozu',
    carModel: 'Model',
    carPrice: 'Cena',
    carImage: 'URL obrázku',
    save: 'Uložit',
    cancel: 'Zrušit',
    
    // Status
    pending: 'Čekající',
    confirmed: 'Potvrzeno',
    completed: 'Dokončeno',
    cancelled: 'Zrušeno',
    maintenance: 'Údržba',
    reserved: 'Rezervováno',
    
    // Damage Inspection
    damageInspection: 'Kontrola poškození',
    selectArea: 'Vyberte oblast',
    damageReport: 'Zpráva o poškození',
    noDamage: 'Bez poškození',
    minorDamage: 'Menší poškození',
    majorDamage: 'Vážné poškození',
    submitReport: 'Odeslat zprávu',
    
    // Notifications
    bookingCreated: 'Rezervace úspěšně vytvořena',
    bookingUpdated: 'Rezervace úspěšně aktualizována',
    bookingDeleted: 'Rezervace úspěšně smazána',
    carAdded: 'Auto úspěšně přidáno',
    carUpdated: 'Auto úspěšně aktualizováno',
    carDeleted: 'Auto úspěšně smazáno',
  },
  nl: {
    // Navigation
    home: 'Home',
    cars: 'Auto\'s',
    bookings: 'Boekingen',
    dashboard: 'Dashboard',
    login: 'Inloggen',
    register: 'Registreren',
    logout: 'Uitloggen',
    
    // Home Page
    carRentalManagement: 'Autoverhuur Beheersysteem',
    searchCars: 'Zoek Auto\'s',
    location: 'Locatie',
    pickupDate: 'Ophaaldatum',
    returnDate: 'Retourdatum',
    carType: 'Autotype',
    priceRange: 'Prijsbereik',
    availability: 'Beschikbaarheid',
    all: 'Alle',
    available: 'Beschikbaar',
    rented: 'Verhuurd',
    selectCarType: 'Selecteer autotype',
    selectPriceRange: 'Selecteer prijsbereik',
    
    // Car Details
    bookNow: 'Nu boeken',
    perDay: '/dag',
    features: 'Functies',
    specifications: 'Specificaties',
    engine: 'Motor',
    transmission: 'Transmissie',
    seats: 'Zitplaatsen',
    fuel: 'Brandstof',
    mileage: 'Kilometerstand',
    selectDates: 'Selecteer datums',
    totalPrice: 'Totale prijs',
    days: 'dagen',
    
    // Booking
    bookingDetails: 'Boekingsdetails',
    customerName: 'Klantnaam',
    customerEmail: 'Klant e-mail',
    confirmBooking: 'Boeking bevestigen',
    bookingConfirmed: 'Boeking bevestigd',
    bookingCancelled: 'Boeking geannuleerd',
    
    // Admin
    fleetManagement: 'Vlootbeheer',
    addCar: 'Auto toevoegen',
    editCar: 'Auto bewerken',
    deleteCar: 'Auto verwijderen',
    carName: 'Autonaam',
    carModel: 'Model',
    carPrice: 'Prijs',
    carImage: 'Afbeelding URL',
    save: 'Opslaan',
    cancel: 'Annuleren',
    
    // Status
    pending: 'In behandeling',
    confirmed: 'Bevestigd',
    completed: 'Voltooid',
    cancelled: 'Geannuleerd',
    maintenance: 'Onderhoud',
    reserved: 'Gereserveerd',
    
    // Damage Inspection
    damageInspection: 'Schade inspectie',
    selectArea: 'Selecteer gebied',
    damageReport: 'Schaderapport',
    noDamage: 'Geen schade',
    minorDamage: 'Lichte schade',
    majorDamage: 'Ernstige schade',
    submitReport: 'Rapport indienen',
    
    // Notifications
    bookingCreated: 'Boeking succesvol aangemaakt',
    bookingUpdated: 'Boeking succesvol bijgewerkt',
    bookingDeleted: 'Boeking succesvol verwijderd',
    carAdded: 'Auto succesvol toegevoegd',
    carUpdated: 'Auto succesvol bijgewerkt',
    carDeleted: 'Auto succesvol verwijderd',
  },
}

export function t(key: string, lang: Language = 'en'): string {
  return translations[lang][key] || translations.en[key] || key
}

