import React from 'react';
import './home.scss';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {BiPlay} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'

const api = "719206c5396ba006206a4156d9f6d212";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming";
const popular = "popular";
const top_rated = "top_rated";
const now_playing = "now_playing";


const Card = ({ img }) => (
    <div className='card'>
        <img src={img} alt="card" />
    </div>
)

const Rows = ({ title, arr = [] }) => (
    <div className='row'>
        <h2>{title}</h2>
        <div>
            {
                arr.map((item, i) => (
                    <Card key={i} img={`${imgUrl}/${item.poster_path}`} />
                ))
            }

        </div>
    </div>
)

const Home = () => {

    const [upcomingMovie, setUpcomingMovie] = useState([]);
    const [popularMovie, setPopularMovie] = useState([]);
    const [topRatedMovie, setTopRatedMovie] = useState([]);
    const [nowPlayingMovie, setnowPlayingMovie] = useState([]);
    const [genre, setGenres] = useState([]);

    useEffect(() => {
        const fetchUpcoming = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${api}`)
            setUpcomingMovie(results)
        };
        const fetchPopular = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${api}`)
            setPopularMovie(results)
        };
        const fetchTopRatedMovie = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${top_rated}?api_key=${api}`)
            setTopRatedMovie(results)
        };
        const fetchNowPlayingMovie = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${now_playing}?api_key=${api}`)
            setnowPlayingMovie(results)
        };
        const getAllGenres = async () => {
            const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${api}`)
            setGenres(genres)
            // console.log(genres);
        };

        fetchUpcoming();
        fetchPopular();
        fetchTopRatedMovie();
        fetchNowPlayingMovie();
        getAllGenres();
    }, [])

    return (
        <div className='home'>
            <div className="banner" style={{
                backgroundImage: popularMovie[0] ? `url(${`${imgUrl}/${popularMovie[0].poster_path}`})` : "#000"
            }}>
                {
                    popularMovie[0] &&   //here condition apply if popularMovies ka 1st element he to show karega
                    (
                        <h1>{popularMovie[0].title}</h1>
                    )
                }
                {
                    popularMovie[0] &&
                    (
                        <p>{popularMovie[0].overview}</p>
                    )
                }
                <div className='btn'>
                    <button> <BiPlay/>Play</button>
                    <button className='Btn2'>List<AiOutlinePlus/></button>
                </div>

            </div>
            <Rows title="Upcoming Movie" arr={upcomingMovie} />
            <Rows title="Popular" arr={popularMovie} />
            <Rows title="TopRated" arr={topRatedMovie} />
            <Rows title="Now Playing" arr={nowPlayingMovie} />

            <div className='genre_box'>
                {
                    genre.map((item) => (
                        <Link key={item.id} to={`/genre/${item.id}`} >{item.name}</Link>

                    ))
                }

            </div>


        </div>
    )
}

export default Home
