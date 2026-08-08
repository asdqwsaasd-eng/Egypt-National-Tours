/**
 * Shared validation types and constants.
 * Full Zod schemas will be implemented in Phase 5 when forms are built.
 * This file establishes the type contracts.
 */

/** Supported request types matching database enum */
export const REQUEST_TYPES = [
  "flight",
  "hotel",
  "egypt_tour",
  "international_tour",
  "visa",
  "security_approval",
  "hajj",
  "umrah",
  "transportation",
  "general",
] as const;

export type RequestType = (typeof REQUEST_TYPES)[number];

/** Request status workflow */
export const REQUEST_STATUSES = [
  "new",
  "contacted",
  "in_progress",
  "completed",
  "cancelled",
] as const;

export type RequestStatus = (typeof REQUEST_STATUSES)[number];

/** Content publishing states */
export const CONTENT_STATUSES = ["draft", "published", "archived"] as const;

export type ContentStatus = (typeof CONTENT_STATUSES)[number];

/** Tour types */
export const TOUR_TYPES = ["egypt", "international"] as const;

export type TourType = (typeof TOUR_TYPES)[number];

/** Flight trip types — approved: One Way, Round Trip, Multi-City */
export const FLIGHT_TRIP_TYPES = ["one_way", "round_trip", "multi_city"] as const;

export type FlightTripType = (typeof FLIGHT_TRIP_TYPES)[number];

/** Hotel star ratings — approved: 3, 4, 5 Stars only */
export const HOTEL_STAR_RATINGS = [3, 4, 5] as const;

export type HotelStarRating = (typeof HOTEL_STAR_RATINGS)[number];

/** Hotel meal plans — approved options only */
export const HOTEL_MEAL_PLANS = [
  "room_only",
  "breakfast",
  "half_board",
  "soft_all_inclusive",
] as const;

export type HotelMealPlan = (typeof HOTEL_MEAL_PLANS)[number];

/** Request source */
export const REQUEST_SOURCES = ["website", "whatsapp", "admin"] as const;

export type RequestSource = (typeof REQUEST_SOURCES)[number];

/** Supported locales */
export const SUPPORTED_LOCALES = ["ar", "en"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
