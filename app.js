const app = Vue.createApp({
    data() {
        return {
            name: 'Kuala Lumpur',
            country: 'Malaysia',
            localtime_epoch: '1694612543',
            tz_id: 'Asia/Kuala_Lumpur',
            temp_c: 32,
            icon: 'https://cdn.weatherapi.com/weather/128x128/night/116.png',
            condition: 'Partly Cloudy',
            feelslike_c: 40.5,
            wind_kph: 22,
            humidity: 83,
            cloud: 54,
            uv: 1,
            pressure_mb: 999,
        };
    },
    methods: {
        async getWeather() {
            const city = document.querySelector('#city').value;
            // this.city = city;
            // console.log(city);
            const res = await fetch(
                'https://api.weatherapi.com/v1/current.json?key=030d6eb01e874c5b93e103358231309&q=' +
                    city +
                    '&aqi=no'
            );
            const resultDisplay = document.querySelector('.result');
            const errorDisplay = document.querySelector('.error');
            if (res.status != 200) {
                resultDisplay.classList.add('hidden');
                errorDisplay.classList.remove('hidden');
                return;
            }
            errorDisplay.classList.add('hidden');
            const { location, current } = await res.json();

            resultDisplay.classList.remove('hidden');
            this.name = location.name;
            this.country = location.country;
            this.localtime_epoch = this.formatDateTime(location.localtime);
            this.tz_id = location.tz_id;
            this.icon = 'https:' + current.condition.icon;
            this.temp_c = current.temp_c;
            this.condition = current.condition.text;
            this.feelslike_c = current.feelslike_c;
            this.wind_kph = current.wind_kph;
            this.humidity = current.humidity;
            this.cloud = current.cloud;
            this.uv = current.uv;
            this.pressure_mb = current.pressure_mb;
            // console.log(this.icon);
            // this.localtime_epoch = location.localtime;
            // console.log(res);
            // console.log(location);
            // console.log(current);
        },
        formatDateTime(date) {
            // console.log('function is working');
            // return 'Function is working!';
            const time = new Date(date);
            const hours = time.getHours();
            const minutes = time.getMinutes();
            const amOrPm = hours >= 12 ? 'PM' : 'AM';
            const hours12 = hours % 12 || 12;
            const formattedTime = `${hours12}:${minutes
                .toString()
                .padStart(2, '0')} ${amOrPm}`;
            return formattedTime;
        },
    },
});
app.mount('#app');
