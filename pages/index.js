import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";


function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});

    React.useEffect(() => {
        service
            .getAllVideos()
            .then((dados) => {
                console.log(dados.data);
                const novasPlaylists = {...config.playlists};
                dados.data.forEach((video) => {
                    if(!novasPlaylists[video.playlist]) {
                        novasPlaylists[video.playlist] = [];
                    } 
                    novasPlaylists[video.playlist].push(video);
                    console.log(video.url);
                })
                console.log({playlists})
                setPlaylists(novasPlaylists);
                console.log(playlists)
            })
        }, [])
        
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                <Banner />
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header></Header>
                <Timeline searchValue={valorDoFiltro} playlists={playlists}></Timeline>
                <Favoritos aluratubes={config.aluratubes} />
            </div>
        </>

    );
  }
  
  export default HomePage

//   function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     );
//   };

const StyledBanner = styled.div `
    height: 230px;
    background-image: url("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`
  const StyledHeader = styled.div`
        background-color: ${({theme}) => theme.backgroundLevel1};

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }

        .user-info {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 16px 32px;
            gap: 16px;
        }
  `;
  const StyledFavoritos = styled.div`
    margin-left: 30px;
    h3 {
        margin-bottom: 20px;
    }
    img {
        border-radius: 50%;
        width: 100px;
    }
    p {
        text-align: center;
        font-size: 14px;
        margin-top: 8px;
    }
    .container {
        display: inline-block;
    }
    .perfil {
        margin-right: 10px;
    }
  `

        function Banner() {
            return (
                <StyledBanner>
                    
                </StyledBanner>
            )
        }

  function Header() {
    return (
        <StyledHeader>
            {/* {<img />} */}
            <section className="user-info">
                <img src= {`https://github.com/${config.github}.png`}/>
                <div>
                    <h2>
                        {config.name}  
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    );
  };

  function Timeline({searchValue, ...props}) {
    const playlistsNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistsNames.map((playlistsName) => {
                const videos = props.playlists[playlistsName];
                // console.log(videos)
                return (
                    <section key={playlistsName}>
                        <h2>{playlistsName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized);
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                );
            })}
        </StyledTimeline>
    );
  };

  function Favoritos(props) {
    const aluratubes = Object.keys(props.aluratubes)
    return (
        <StyledFavoritos>
            {aluratubes.map((aluratube) => {
                const perfis = props.aluratubes[aluratube];
                return(
                    <section key={aluratube}>
                        <h3>AluraTubes favoritos</h3>
                            {perfis.map((perfil) => {
                                return (
                                    <div  className="container">
                                        <div key={perfil} className="perfil">
                                            <img  src={perfil.img} />
                                            <p  >{perfil.nome}</p>
                                        </div>
                                    </div>
                                )
                            })}
                    </section>)
                })}
        </StyledFavoritos>
    )
  }
