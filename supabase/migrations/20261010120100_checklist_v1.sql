-- Checklist v1. Never edit a seeded version: add a new migration with version 2.
insert into public.checklist_templates (version, fields) values (1, $json$
[
  {
    "id": "structure_no_cracks",
    "section": "Structure",
    "label": "No cracks in walls or ceilings",
    "type": "boolean",
    "hint": "Look around windows, door frames and room corners."
  },
  {
    "id": "structure_no_damp",
    "section": "Structure",
    "label": "No damp patches, mould or peeling paint",
    "type": "boolean",
    "hint": "Check behind furniture, inside wardrobes and in bathroom corners. A musty smell is a red flag."
  },
  {
    "id": "structure_floor_level",
    "section": "Structure",
    "label": "Floors are level and don't creak",
    "type": "boolean",
    "hint": "A marble or a phone level app helps."
  },
  {
    "id": "structure_floor_condition",
    "section": "Structure",
    "label": "Floor condition",
    "type": "rating"
  },
  {
    "id": "windows_frames_condition",
    "section": "Windows & doors",
    "label": "Window frames condition",
    "type": "rating"
  },
  {
    "id": "windows_glazing",
    "section": "Windows & doors",
    "label": "Glazing",
    "type": "options",
    "options": [
      {
        "value": "single",
        "label": "Single"
      },
      {
        "value": "double",
        "label": "Double"
      },
      {
        "value": "triple",
        "label": "Triple"
      },
      {
        "value": "unknown",
        "label": "Unknown"
      }
    ]
  },
  {
    "id": "windows_operate",
    "section": "Windows & doors",
    "label": "Windows and shutters open and close properly",
    "type": "boolean"
  },
  {
    "id": "door_security",
    "section": "Windows & doors",
    "label": "Armoured front door",
    "type": "boolean"
  },
  {
    "id": "plumbing_pressure",
    "section": "Plumbing",
    "label": "Water pressure",
    "type": "rating",
    "hint": "Run the shower and the kitchen tap at the same time."
  },
  {
    "id": "plumbing_hot_water",
    "section": "Plumbing",
    "label": "Hot water arrives within about 30 seconds",
    "type": "boolean"
  },
  {
    "id": "plumbing_drains",
    "section": "Plumbing",
    "label": "Sinks, shower and toilet drain quickly",
    "type": "boolean"
  },
  {
    "id": "plumbing_no_leaks",
    "section": "Plumbing",
    "label": "No leaks under sinks or around the boiler",
    "type": "boolean"
  },
  {
    "id": "plumbing_bathroom",
    "section": "Plumbing",
    "label": "Bathroom condition",
    "type": "rating"
  },
  {
    "id": "electrical_certified",
    "section": "Electrical",
    "label": "Electrical system is compliant and certified",
    "type": "boolean",
    "hint": "Ask for the latest electrical safety certificate."
  },
  {
    "id": "electrical_rcd",
    "section": "Electrical",
    "label": "Panel has a residual-current breaker",
    "type": "boolean"
  },
  {
    "id": "electrical_outlets",
    "section": "Electrical",
    "label": "Enough sockets in every room",
    "type": "rating"
  },
  {
    "id": "heating_type",
    "section": "Heating & cooling",
    "label": "Heating",
    "type": "options",
    "options": [
      {
        "value": "gas_boiler",
        "label": "Own gas boiler"
      },
      {
        "value": "centralised",
        "label": "Centralised"
      },
      {
        "value": "heat_pump",
        "label": "Heat pump"
      },
      {
        "value": "district",
        "label": "District heating"
      },
      {
        "value": "other",
        "label": "Other"
      }
    ]
  },
  {
    "id": "heating_boiler_age",
    "section": "Heating & cooling",
    "label": "Boiler age",
    "type": "options",
    "options": [
      {
        "value": "lt5",
        "label": "Under 5 years"
      },
      {
        "value": "5_10",
        "label": "5–10 years"
      },
      {
        "value": "10_15",
        "label": "10–15 years"
      },
      {
        "value": "gt15",
        "label": "Over 15 years"
      },
      {
        "value": "unknown",
        "label": "Unknown"
      }
    ]
  },
  {
    "id": "heating_radiators",
    "section": "Heating & cooling",
    "label": "Radiators heat evenly",
    "type": "boolean",
    "hint": "Feel each radiator during a winter visit."
  },
  {
    "id": "cooling_ac",
    "section": "Heating & cooling",
    "label": "Air conditioning installed",
    "type": "boolean"
  },
  {
    "id": "energy_class",
    "section": "Energy",
    "label": "Energy class",
    "type": "options",
    "options": [
      {
        "value": "A",
        "label": "A"
      },
      {
        "value": "B",
        "label": "B"
      },
      {
        "value": "C",
        "label": "C"
      },
      {
        "value": "D",
        "label": "D"
      },
      {
        "value": "E",
        "label": "E"
      },
      {
        "value": "F",
        "label": "F"
      },
      {
        "value": "G",
        "label": "G"
      },
      {
        "value": "unknown",
        "label": "Unknown"
      }
    ]
  },
  {
    "id": "energy_insulation",
    "section": "Energy",
    "label": "Thermal insulation",
    "type": "rating",
    "hint": "Do rooms feel draughty, or noticeably colder near the walls?"
  },
  {
    "id": "kitchen_included",
    "section": "Kitchen",
    "label": "Kitchen included in the sale",
    "type": "boolean"
  },
  {
    "id": "kitchen_condition",
    "section": "Kitchen",
    "label": "Kitchen condition",
    "type": "rating"
  },
  {
    "id": "light_orientation",
    "section": "Light & noise",
    "label": "Main orientation",
    "type": "options",
    "options": [
      {
        "value": "north",
        "label": "North"
      },
      {
        "value": "east",
        "label": "East"
      },
      {
        "value": "south",
        "label": "South"
      },
      {
        "value": "west",
        "label": "West"
      },
      {
        "value": "multiple",
        "label": "Multiple sides"
      }
    ]
  },
  {
    "id": "light_natural",
    "section": "Light & noise",
    "label": "Natural light",
    "type": "rating"
  },
  {
    "id": "noise_street",
    "section": "Light & noise",
    "label": "Quiet from street noise",
    "type": "rating",
    "hint": "5 means silent. Close the windows and listen."
  },
  {
    "id": "noise_neighbours",
    "section": "Light & noise",
    "label": "Quiet from neighbours",
    "type": "rating"
  },
  {
    "id": "view_privacy",
    "section": "Light & noise",
    "label": "Not directly overlooked by facing windows",
    "type": "boolean"
  },
  {
    "id": "building_fees",
    "section": "Building",
    "label": "Monthly building or HOA fees",
    "type": "text"
  },
  {
    "id": "building_no_extra_works",
    "section": "Building",
    "label": "No extraordinary works approved or planned",
    "type": "boolean",
    "hint": "Ask for the minutes of the last owners' meetings."
  },
  {
    "id": "building_elevator",
    "section": "Building",
    "label": "Elevator",
    "type": "boolean"
  },
  {
    "id": "building_common_areas",
    "section": "Building",
    "label": "Façade, roof and common areas condition",
    "type": "rating"
  },
  {
    "id": "building_storage",
    "section": "Building",
    "label": "Cellar or storage room included",
    "type": "boolean"
  },
  {
    "id": "building_parking",
    "section": "Building",
    "label": "Parking",
    "type": "options",
    "options": [
      {
        "value": "none",
        "label": "None"
      },
      {
        "value": "street",
        "label": "Street only"
      },
      {
        "value": "spot",
        "label": "Private spot"
      },
      {
        "value": "garage",
        "label": "Garage"
      }
    ]
  },
  {
    "id": "docs_conformity",
    "section": "Documents",
    "label": "Layout matches the registered floor plan",
    "type": "boolean",
    "hint": "Unregistered changes (moved walls, added rooms) can block the sale or cost money to regularise."
  },
  {
    "id": "docs_habitability",
    "section": "Documents",
    "label": "Occupancy or habitability certificate available",
    "type": "boolean"
  },
  {
    "id": "docs_energy_cert",
    "section": "Documents",
    "label": "Energy performance certificate available",
    "type": "boolean"
  },
  {
    "id": "docs_no_liens",
    "section": "Documents",
    "label": "No mortgages or liens on the property",
    "type": "boolean"
  },
  {
    "id": "docs_no_arrears",
    "section": "Documents",
    "label": "Seller has no unpaid building fees",
    "type": "boolean"
  },
  {
    "id": "area_transport",
    "section": "Surroundings",
    "label": "Public transport nearby",
    "type": "rating"
  },
  {
    "id": "area_services",
    "section": "Surroundings",
    "label": "Shops, schools and services nearby",
    "type": "rating"
  },
  {
    "id": "area_safety",
    "section": "Surroundings",
    "label": "Feels safe at different times of day",
    "type": "rating"
  },
  {
    "id": "area_internet",
    "section": "Surroundings",
    "label": "Best internet available",
    "type": "options",
    "options": [
      {
        "value": "ftth",
        "label": "Fibre to the home"
      },
      {
        "value": "fttc",
        "label": "Fibre to the cabinet"
      },
      {
        "value": "adsl",
        "label": "ADSL"
      },
      {
        "value": "unknown",
        "label": "Unknown"
      }
    ]
  },
  {
    "id": "notes_pros",
    "section": "Notes",
    "label": "What I liked",
    "type": "text"
  },
  {
    "id": "notes_cons",
    "section": "Notes",
    "label": "What worried me",
    "type": "text"
  }
]
$json$::jsonb);
