import { client } from "./data";

export function formatDate(dateStr: string) {
  let year, month, day

  if (!dateStr) {
    return ""
  } else {
    year = dateStr.slice(0, 4);
    month = dateStr.slice(4, 6);
    day = dateStr.slice(6, 8);
  }


  return `${year}-${month}-${day}`;
}

export async function executeQuery(params) {
  const order = params.searchParams?.order || 'center_classification_date';
  const direction = params.searchParams?.direction || 'DESC';
  const currentPage = Number(params.searchParams?.page) || 1;
  const limit = params.searchParams?.limit || params.defaultLimit;

  const search = params.searchParams?.search ? `recall_number LIKE "%${params.searchParams.search}%" OR reason LIKE "%${params.searchParams.search}%" OR product_description LIKE "%${params.searchParams.search}%" OR recalling_firm LIKE "%${params.searchParams.search}%" OR product_type LIKE "%${params.searchParams.search}%" OR code_info LIKE "%${params.searchParams.search}%" OR summary LIKE "%${params.searchParams.search}%"` : '';

  const filters = (dbHeader, paramQuery) => {
    const arr = paramQuery ? paramQuery.split("+") : []
    let qString = ""
    if (arr) {
      arr.forEach((e, i) => {
        i == 0 ? qString += `${dbHeader} LIKE "${e}"` : qString += ` OR ${dbHeader} LIKE "${e}"`;
      })
    } else {
      qString = ""
    }
    return qString
  }

  const filtersArray = [
    filters("authority", params.searchParams.agency),
    filters("classification", params.searchParams.class),
    filters("reason", params.searchParams.allergens)
  ]

  function concatFilters(arr) {
    let string = ""
    arr.forEach((e, i) => {
      if (e !== "") {
        string == "" ? string += `(${e})` : string += ` AND (${e})`
      }
    })
    return string
  }

  const genFilter = concatFilters(filtersArray)
  let conditions = ""

  if (search && genFilter) {
    conditions = `WHERE (${search}) AND (${genFilter})`
  }
  if (search && !genFilter) {
    conditions = `WHERE ${search}`
  }
  if (!search && genFilter) {
    conditions = `WHERE ${genFilter}`
  }


  const sql = `SELECT center_classification_date, recalling_firm, reason, classification, recall_number FROM 'reports' ${conditions} ORDER BY ${order} ${direction} LIMIT ${limit} OFFSET ${(currentPage - 1) * +limit}`

  console.log("from functions.ts:" + sql)

  const { rows } = await client.execute(sql);

  const count = await client.execute(
    `SELECT COUNT(*) FROM 'reports' ${conditions}`,
  );

  const pageCount = Math.ceil(Number(count.rows[0][0]) / +limit)

  const data = rows.map((row) => {

    return {
      recall_date: formatDate(row.center_classification_date.toString()),
      recalling_firm: row.recalling_firm ? String(row.recalling_firm).replaceAll("&#039;", "'") : ""
      ,
      recall_reason: row.reason,
      classification: row.classification,
      recall_number: row.recall_number,
    };
  });

  return [data, pageCount]
}
