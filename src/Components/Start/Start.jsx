import { useNavigate } from 'react-router-dom'
import style from './Start.module.css'
import { Fade, Slide, Zoom } from 'react-awesome-reveal'

export default function Start() {



  let Navigate = useNavigate()

  return <>
    <div className={style.startComponent}>
      <div className='container h-100'>
        <Zoom direction='left'> <h1 className='text-center pt-5'><span className={style.lets}>Let's </span><span className={style.play}> Play</span></h1></Zoom>

        <Slide> <p className={style.parag}>Tic-tac-toe is a game in which two players take turns in drawing either an ` O' or an ` X' in one square of a grid consisting of nine squares.</p></Slide>

        <Fade><div className={style.btns}>
          <button onClick={() => Navigate('one')} className={style.one}>1 Player</button>
          <button onClick={() => Navigate('two')} className={style.two}>2 Players</button>

              </div>
         </Fade>

      </div>


    </div>
  </>
}
