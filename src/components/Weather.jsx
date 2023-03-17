import React, { useEffect, useState } from 'react'

export const Weather = () => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState(null)
    const [weatherIconUrl, setWeatherIconUrl] = useState('')

    useEffect(() => {
        const apiKey = '2b20d100a7bd36806bec2cf65889ca83'
        const defaultLocation = 'Baku'
        const fetchData = async () => {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=${apiKey}&units=metric`)
            const allData = await res.json()
            if (res.ok) {
                setData(allData)
                setWeatherIconUrl(`https://openweathermap.org/img/w/${allData.weather[0].icon}.png`)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        const apiKey = '2b20d100a7bd36806bec2cf65889ca83'
        const fetchData = async () => {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`)
            const allData = await res.json()
            if (res.ok) {
                setData(allData)
                setWeatherIconUrl(`https://openweathermap.org/img/w/${allData.weather[0].icon}.png`)
            } else {
                setData(null)
                setWeatherIconUrl('')
            }
        }

        if (search !== '') {
            fetchData()
        }
    }, [search])

    return (
        <div className='weather'>
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search...' />
            {data ? (
                <div className='weather-item'>
                    {weatherIconUrl && (
                        <img src={weatherIconUrl} alt={data.weather[0].description} />
                    )}
                    <span className="name">
                        {data.name}
                    </span>
                    {data.main && !isNaN(data.main.temp) && (
                        <span className="current-data">
                            {Math.round(data.main.temp)}<strong>°</strong>
                        </span>
                    )}
                    <span className="current-weather">
                        {data.sys && data.sys.country}
                    </span>
                </div>
            ) : (
                <div className='weather-item'>
                    <span>Not Found...</span>
                </div>
            )}
        </div >
    )
}
