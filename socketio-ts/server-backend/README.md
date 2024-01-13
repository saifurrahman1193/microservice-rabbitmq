## Project Setup
```
npm install typescript
npx tsc --init
tsc --version
npm i express typescript nodemon ts-node @types/express @types/node
```
## package.json
```
  "type": "module",
```

## Commands 

### Docker
```
sudo docker-compose down
sudo docker-compose build && docker-compose up -d
```

#### Docker Network 
```
docker network create ms_rmq_network
```

## Run 
```
npm run dev
```


## Database
```
use socket_server

```

## GIT
```
feat: New feature for the user.
fix: Bug fix.
style: Code Style Changes.
refactor: Code Refactoring.
build: Build System Changes.
ci: Continuous Integration Changes.
perf: Performance Improvements.
revert: Revert a Previous Commit.
docs: Documentation changes.
test: Adding or modifying tests.
chore: Routine tasks, maintenance, or housekeeping.
```

## Documentation
- https://www.youtube.com/watch?v=H91aqUHn8sE 
- https://www.youtube.com/watch?v=b8ZUb_Okxro
- https://github.com/mamun-swe/api.auth.asazaoa.com


### API
#### Pagination
```
{
 "data": [
   {
     "id": 1,
     "title": "Post 1",
     "content": "Lorem ipsum dolor sit amet.",
     "category": "Technology"
   },
   {
     "id": 2,
     "title": "Post 2",
     "content": "Praesent fermentum orci in ipsum.",
     "category": "Sports"
   },
   {
     "id": 3,
     "title": "Post 3",
     "content": "Vestibulum ante ipsum primis in faucibus.",
     "category": "Fashion"
   }
 ],
 "pagination": {
   "total_records": 100,
   "current_page": 1,
   "total_pages": 10,
   "next_page": 2,
   "prev_page": null
 }
}
```