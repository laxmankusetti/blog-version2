import Typewriter from "typewriter-effect";


const About = () => {
  return (
    <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-screen gap-5 md:flex-row">
      <div className="w-[35%] h-[90%]">
        <img
          src="./laxman.jpeg"
          alt="laxman pic"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            alignSelf: "center",
          }}
        />
      </div>
      <div className="w-[55%] h-[90%]">
        <h1 className="text-4xl text-center text-gray-500 font-bold">
          About ME
        </h1>
        <div className="dark:text-gray-400 mt-5">
        <Typewriter
            options={{
              strings: [
               ` Welcome to my Blog, where I embark on a continuous journey of
                exploration and growth in the ever-evolving landscape of technology.
                My journey began as a frontend developer, where I delved into the
                intricacies of crafting engaging user experiences. Over time, my
                curiosity led me to explore the depths of the MERN stack, honing my
                skills in MongoDB, Express.js, React.js, and Node.js to architect
                robust and dynamic web applications. Driven by an insatiable thirst
                for knowledge, I've delved into advanced concepts within the
                JavaScript programming language, unraveling its complexities and
                pushing the boundaries of what's possible. Through the relentless
                pursuit of learning, I've forged a path of self-discovery,
                leveraging hands-on experience and a voracious appetite for
                experimentation. My journey is not just about mastering technologies;
                it's about embracing the relentless pursuit of excellence and
                innovation. This blog serves as a testament to my ongoing quest for
                knowledge, a platform where I document my insights, challenges, and
                triumphs as I navigate the ever-expanding universe of technology. Join
                me as we embark on this exhilarating journey together, where the
                possibilities are limitless, and the adventure never ends.`
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
