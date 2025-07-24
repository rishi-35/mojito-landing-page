import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import { SplitText } from 'gsap/all';
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive';
const Hero = () => {
    const videoRef =useRef();

    const isMobile = useMediaQuery({maxWidth: 767})
     
    useGSAP(()=>{
        const herosplit=new SplitText('.title',{type:'chars, words'});

        const paragraghsplit = new SplitText('.subtitle',{type:'lines'});

        herosplit.chars.forEach((char)=> char.classList.add('text-gradient'));

        gsap.from(herosplit.chars,{
            yPercent:100,
            duration:1.8,
            ease:'expo.out',
            stagger:0.06
        })

        gsap.from(paragraghsplit.lines,{
            opacity:0,
            yPercent:100,
            duration:1.8,
            ease:'expo.out',
            stagger:0.06,
            delay:1,
        })

        const leaf=gsap.timeline({
            scrollTrigger:{
                trigger:'#hero',
                start:'top top',
                end:'bottom top',
                scrub:true,
            }
        })
        leaf.to('.right-leaf',{y:300 })
        leaf.to('.left-leaf',{y:-200})

        const startvalue= isMobile ? 'top 50%' : 'center 60%';
        const endValue= isMobile? '120% top' :'bottom top';

         const tl= gsap.timeline({
            scrollTrigger:{
                trigger: 'video',
                start: startvalue,
                end: endValue,
                scrub:true,
                pin: true, 
            }
         })
         
         videoRef.current.onloadedmetadata =()=>{
            tl.to(videoRef.current,{
                currentTime:videoRef.current.duration
            })
         }
    },[])
  return (
    <>
        <section id='hero' className='noisy '>
            <h1 className='title'>MOJITO</h1>

            <img src="/images/hero-left-leaf.png" alt="left-leaf " className='left-leaf' />
            <img src="/images/hero-right-leaf.png" alt="right-leaf " className='right-leaf' />

            <div className='body'>
                <div className='content '>
                    <div className='space-y-5 hidden md:block'>
                        <p>Cool. Classic.</p>
                        <p className='subtitle'>
                            Sip the Spirit <br/> of Summer
                        </p>

                    </div>
                    <div className='view-cocktails'>
                        <p className='subtitle'>
                            Every cocktail on our menu is a blend of premium ingredients, creative ,flair, and timeless recipes - designed to delight your senses.
                        </p>
                        <a href="#cocktails">View Cocktails</a>
                    </div>

                </div>

            </div>
        </section>
        <div className='video absolute inset-0'>
             <video
             ref={videoRef}
              src="/videos/output.mp4" muted playsInline preload='auto'></video>
        </div>
    </>
  );
}

export default Hero;
