# dockerize -wait tcp://postgre:5432 -timeout 20s

echo "Waiting for postgres..."
while ! nc -z postgres-114 5432; do
    sleep 0.1
done
sleep 2
./node_modules/.bin/sequelize db:migrate
./node_modules/.bin/sequelize db:seed:all
echo "Server started"
node index.js