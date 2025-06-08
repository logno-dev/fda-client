export type FilterItem = {
  name: string,
  value: string
}

export type FilterDef = {
  headerName: string,
  headerId: string,
  items: Array<FilterItem>
}

export const classification: FilterDef = {
  headerName: "Recall Class",
  headerId: "class",
  items: [
    {
      name: "Class I",
      value: "Class I"
    },
    {
      name: "Class II",
      value: "Class II"
    },
    {
      name: "Class III",
      value: "Class III"
    },
    {
      name: "Public Health Alert",
      value: "Public Health Alert"
    }
  ]
}

export const agency: FilterDef = {
  headerName: "Agency",
  headerId: "agency",
  items: [
    {
      name: "FDA",
      value: "FDA"
    },
    {
      name: "USDA",
      value: "USDA"
    }
  ]
}

export const allergens: FilterDef = {
  headerName: "Major Allergens",
  headerId: "allergens",
  items: [
    {
      name: "Milk",
      value: "%%milk%"
    },
    {
      name: "Soy",
      value: "%%soy%",
    },
    {
      name: "Wheat/Gluten",
      value: "%%gluten"
    },
    {
      name: "Tree Nuts",
      value: "%%tree nut%"
    },
    {
      name: "Egg",
      value: "%%egg"
    },
    {
      name: "Peanuts",
      value: "%%peanuts%"
    },
    {
      name: "Fish",
      value: "%%fish%"
    },
    {
      name: "Sesame",
      value: "%%Sesame%"
    },
    {
      name: "Shellfish",
      value: "%%shellfish"
    }
  ]
}
