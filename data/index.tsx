import {
  Convertible,
  Coupe,
  HatchBack,
  Sedan,
  StationWagon,
  SUV,
} from "@/components/car-icons";
import { Battery, Droplet, Gauge, Zap } from "lucide-react";

export const vehicleTypes = [
  { name: "Sedan", icon: Sedan },
  { name: "SUV", icon: SUV },
  { name: "Station Wagon", icon: StationWagon },
  { name: "Hatchback", icon: HatchBack },
  { name: "Coupe", icon: Coupe },
  { name: "Convertible", icon: Convertible },
];

export const budgetRanges = [
  { label: "Economy", min: 20000, max: 35000, color: "bg-green-500" },
  { label: "Mid-Range", min: 35000, max: 50000, color: "bg-blue-500" },
  { label: "Luxury", min: 50000, max: 80000, color: "bg-purple-500" },
  { label: "Premium", min: 80000, max: 100000, color: "bg-rose-500" },
];

export const fuelTypes = [
  { name: "Petrol", icon: Gauge },
  { name: "Diesel", icon: Droplet },
  { name: "Electric", icon: Zap },
  { name: "Hybrid", icon: Battery },
];

export const carBrands = [
  { id: "toyota", name: "Toyota", origin: "Japan" },
  { id: "honda", name: "Honda", origin: "Japan" },
  { id: "bmw", name: "BMW", origin: "Germany" },
  { id: "mercedes", name: "Mercedes-Benz", origin: "Germany" },
  { id: "audi", name: "Audi", origin: "Germany" },
  { id: "ford", name: "Ford", origin: "USA" },
  { id: "chevrolet", name: "Chevrolet", origin: "USA" },
  { id: "volkswagen", name: "Volkswagen", origin: "Germany" },
  { id: "hyundai", name: "Hyundai", origin: "South Korea" },
  { id: "kia", name: "Kia", origin: "South Korea" },
  { id: "volvo", name: "Volvo", origin: "Sweden" },
  { id: "lexus", name: "Lexus", origin: "Japan" },
  { id: "subaru", name: "Subaru", origin: "Japan" },
  { id: "mazda", name: "Mazda", origin: "Japan" },
  { id: "nissan", name: "Nissan", origin: "Japan" },
  { id: "porsche", name: "Porsche", origin: "Germany" },
  { id: "tesla", name: "Tesla", origin: "USA" },
  { id: "jeep", name: "Jeep", origin: "USA" },
  { id: "landrover", name: "Land Rover", origin: "UK" },
  { id: "jaguar", name: "Jaguar", origin: "UK" },
  { id: "fiat", name: "Fiat", origin: "Italy" },
  { id: "alfa", name: "Alfa Romeo", origin: "Italy" },
  { id: "ferrari", name: "Ferrari", origin: "Italy" },
  { id: "lamborghini", name: "Lamborghini", origin: "Italy" },
  { id: "mclaren", name: "McLaren", origin: "UK" },
  { id: "peugeot", name: "Peugeot", origin: "France" },
  { id: "citroen", name: "Citroën", origin: "France" },
  { id: "renault", name: "Renault", origin: "France" },
  { id: "skoda", name: "Škoda", origin: "Czech Republic" },
  { id: "seat", name: "SEAT", origin: "Spain" },
];
