async function fetchUniversities() {
  let response = await fetch(
    "http://universities.hipolabs.com/search?name=israel"
  );
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error(response);
  }
}

let universities = await fetchUniversities().catch((error) =>
  console.log(error.message)
);

let israelUniversities = [];

try {
  universities.forEach((item) => {
    if (item.country === "Israel") {
      israelUniversities.push(item);
    }
  });
  console.log(israelUniversities);
} catch {
  console.log("something is wrong!");
}
