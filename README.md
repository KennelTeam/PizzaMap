# PizzaMap

## Result

Result is on heroku - [link](https://pizzamap.herokuapp.com/)

### Installation and running locally

1. Clone repository
2. Install http-server node library
3. Run npm start
4. Go to localhost:8080/entire.html

## Functionality

- Observe heatmap of orders (green to red) and zoom
- Click "Статистика по области" button in the top left corner of the map, seleсt area on the map and see stats of selected area
- Apply filters using panel on the left of the map. There are also 2 cities available - "Вологда" and "Ярославль"
- Observe stats of all orders (with applied filters) currently displaying on map (stats are below the map)

## How is it done?

This is fully frontend app (no server) and it is written in vanilla JS (yes, we are crazy :) )

For map we are using OpenLayers and OpenStreetMaps as main maps layer

Design is made using Bootstrap + pure HTML and CSS

## Problems

- We don't remember any significant problems

## Ways to improve

- Adapt design for different screen sizes
- Create mobile version
- Rewrite to React that code is more organized
