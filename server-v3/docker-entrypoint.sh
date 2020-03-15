# dockerize -wait tcp://postgre:5432 -timeout 20s

echo "installing babel"
npm run babel-version
npx babel src --out-dir dist
# npx babel src --watch --out-dir dist
echo "Waiting for postgres..."
while ! nc -z postgres-114 5432; do
    sleep 0.1
done
# sleep 2
./node_modules/.bin/sequelize db:migrate --env development
./node_modules/.bin/sequelize db:seed:all --env development
echo "Starting Server..."
node dist/index.js