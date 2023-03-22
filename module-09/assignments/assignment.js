const displayData = (xmlDoc) => {
  const tableElement = document.getElementById(`people`);

  const personNodes = xmlDoc.getElementsByTagName("person");

  for (let index = 0; index < personNodes.length; index++) {
    const person = personNodes[index];
    const parsedPerson = parsePerson(person);
    const rowElement = createRow(parsedPerson);
    tableElement.appendChild(rowElement);
  }
};

const createRow = (parsedPerson) =>
  stringToNode(`<tr>
              <th>${parsedPerson.id}</th>
              <th>${parsedPerson.first_name} ${parsedPerson.last_name}</th>
              <th>${parsedPerson.email}</th>
              <th>${parsedPerson.gender}</th>
              <th>${parsedPerson.ip_address}</th>
          </tr>
          `);

const parsePerson = (person) => {
  const id = person.getElementsByTagName(`id`)[0].childNodes[0].nodeValue;
  const first_name =
    person.getElementsByTagName(`first_name`)[0].childNodes[0].nodeValue;
  const last_name =
    person.getElementsByTagName(`last_name`)[0].childNodes[0].nodeValue;
  const email = person.getElementsByTagName(`email`)[0].childNodes[0].nodeValue;
  const gender =
    person.getElementsByTagName(`gender`)[0].childNodes[0].nodeValue;
  const ip_address =
    person.getElementsByTagName(`ip_address`)[0].childNodes[0].nodeValue;
  return { id, first_name, last_name, email, gender, ip_address };
};

const stringToNode = (html) => {
  const template = document.createElement(`template`);
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
};

// Using fetch API with async/await
const main = async () => {
  const result = await fetch("./people.xml", { method: "GET" });
  const xmlText = await result.text();
  const xmlDoc = new DOMParser().parseFromString(xmlText, "text/xml");
  displayData(xmlDoc);
};

main();
