global.fetch = require("node-fetch-polyfill");
const { csv } = require("d3-fetch");
const { nest } = require("d3-collection");
const { autoType } = require("d3-dsv");
const { omit, pick, pickBy } = require("lodash");
const fs = require("fs");


async function fetchData(sheetId, outFile) {
  const url = `https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?gid=0&single=true&output=csv`
  let data = await csv(url, autoType);

  const result = data.reduce((acc, cur) => {
    const groupFields = ["group", "groupDescription"];
    const group = cur.group
      ? {
          ...pick(cur, groupFields),
          questions: []
        }
      : acc.pop();

    const questionFields = ["id", "title", "type"];
    const question = cur.title
      ? {
          ...pick(cur, questionFields),
          options: []
        }
      : group.questions.pop();

    const nextOption = omit(pickBy(cur, Boolean), groupFields.concat(questionFields))
    question.options.push(nextOption);
    group.questions.push(question);

    acc.push(group);

    return acc;
  }, []);

  fs.writeFile(outFile, JSON.stringify(result, null, 2), err => {
    if (err) throw err;
    console.log("Data saved");
  });
}

fetchData(process.argv[2], process.argv[3])
