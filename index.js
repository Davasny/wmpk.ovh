const urlMap = {
  "/wm-ws01": "https://zoom.us/j/3915831950",
  "/wm-ws02": "https://zoom.us/j/4799046470",
  "/wm-ws03": "https://zoom.us/j/5559503220",
  "/wm-ws04": "https://zoom.us/j/7962234103",
  "/wm-ws05": "https://zoom.us/j/7083540439",
  "/wm-ws06": "https://zoom.us/j/8274654806",
  "/wm-ws07": "https://zoom.us/j/5408623619",
  "/wm-ws08": "https://zoom.us/j/4478402934",
  "/wm-ws09": "https://zoom.us/j/5845154927",
  "/wm-ws10": "https://zoom.us/j/8195247519",
  "/wm-ws11": "https://zoom.us/j/5353690835",
  "/wm-ws12": "https://zoom.us/j/4211035460",
  "/wm-ws13": "https://zoom.us/j/3701401077",
  "/wm-ws14": "https://zoom.us/j/4308219734",
  "/wm-ws15": "https://zoom.us/j/7357943543",
  "/wm-ws16": "https://zoom.us/j/5595735060",
  "/wm-ws17": "https://zoom.us/j/5472556330",
  "/wm-ws18": "https://zoom.us/j/3468812474",
  "/wm-ws19": "https://zoom.us/j/7085368772",
  "/wm-ws20": "https://zoom.us/j/8293299696"
};

const shareIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="-0.5 -0.5 121 121"><g stroke="#000"><circle cx="20" cy="70" pointer-events="all" r="20"/><path d="M35 57l45-37" fill="none" stroke-width="8" stroke-miterlimit="10" pointer-events="stroke"/><circle cx="90" cy="20" pointer-events="all" r="20"/><circle cx="100" cy="100" pointer-events="all" r="20"/><path d="M39 77l42 16" fill="none" stroke-width="9" stroke-miterlimit="10" pointer-events="stroke"/></g></svg>';

const siteDomain = "wmpk.ovh";

// ------------------ APP CODE ------------------ //
const createRow = (cells, isHeader = false) => {
  let row = '<tr>';
  cells.map((cell) => {
    (isHeader)
      ? row += `<th>${cell}</th>`
      : row += `<td>${cell}</td>`
  })
  row += `</tr>`;
  return row;
};

const createTable = () => {
  let table = "<table>";
  table += `<thead>${createRow(['Nazwa sali', 'Zoom'], true)}</thead>`;
  table += "<tbody>";

  for (const [key, value] of Object.entries(urlMap))
    table += createRow([
      `
        <a href="https://${siteDomain}${key}" target="_blank"><span class="link-sm">https://${siteDomain}</span><span class="link-md">${key}</span></a>
        <span onclick="share('${key.replace('/', '')}', 'https://${siteDomain}${key}')" class="share">
          <span>${shareIcon}</span>
        </span>
      `,
      `<a href="${value}" target="_blank">${value}</a>`
    ]);

  table += "</tbody>";
  return table;
};

const html = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Przekierowania z PK na zoom.us</title>
  <meta name="description" content="Znajdź szybko swoją salę">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <style>
    /*  body content */
    body {
        margin-left: auto;
        margin-right: auto;
        max-width: 1024px;
        font-family: Arial, sans-serif;
        padding: 5px;
    }    
    
    a {
        font-size: 16px;
        text-decoration-color: gray;
        color: gray;
    }
    
    a .link-sm {
        font-size: 12px;
        color: gray;
    }
    
    a .link-md {
        color: #535151;
        font-weight: bold;
    }
    
    /* table */
    table {
      margin-left: auto;
      margin-right: auto;
      border-collapse: collapse;
    }
    
    table, th, td {
      border: 1px solid black;
    }
 
    th {
      height: 30px;
      text-align: center;
    }
    
    th, td {
      padding: 5px 15px 5px 15px;
    }
    
    /* share */
    .share {
      color: #4949a9;
      cursor: pointer;
      display: none; 
    }
    
    @media screen and (max-width: 500px) {
      .share { 
        display: inline; 
      }
    }
  </style>
</head>
<body>
  <h1>Wydział Mechaniczny Politechniki Krakowskiej</h1>
  <p><a href="http://podzial.mech.pk.edu.pl/stacjonarne/html/index.html">http://podzial.mech.pk.edu.pl/stacjonarne/html/index.html</a></p>
  <p>Ta prosta strona ma na celu ułatwienie wchodzenia na pokoje w <a href="zoom.us">zoom.us</a> według tabeli:</p>
  ${createTable()}
  
  <script>
    const share = (sala, link) => {
      navigator.share({
          title: 'Zajęcia w ' + sala,
          url: link
      })
    };
  </script>
</body>
</html>`


const handleRequest = async (request) => {
  const statusCode = 307;
  const url = new URL(request.url);
  const {pathname} = url;

  if (urlMap.hasOwnProperty(pathname))
    return Response.redirect(urlMap[pathname], statusCode);

  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
}

addEventListener("fetch", async event => {
  event.respondWith(handleRequest(event.request));
});
