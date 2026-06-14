import { motion } from "motion/react";
import image from "./assets/Logo.svg";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import Instructions from "./components/Instructions";

function App() {
  const [parms, setParms] = useState("");
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const [msgBox, setMsgBox] = useState(false);
  const [msg, setMsg] = useState("Sample Message");
  const [loading, setLoading] = useState(false);

  const searchHandle = () => {
    if (parms === query) {
      return;
    } else if (parms) {
      setQuery(parms);
      setResult([]);
    } else {
      setMsg("Please Enter any word to search for...");
      setMsgBox(true);
      setQuery("");
    }
  };

  useEffect(() => {
    if (msgBox) {
      const timer = setTimeout(() => setMsgBox(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [msgBox]);

  useEffect(() => {
    const datafetch = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.potterdb.com/v1/characters?filter[name_cont]=${query}`
        );
        const data = await response.json();

        if (data.data.length === 0) {
          setMsg("No matches found");
          setMsgBox(true);
        }

        setResult(data.data);
      } catch (error) {
        setMsg("Error fetching data");
        setMsgBox(true);
      } finally {
        setLoading(false);
      }
    };

    if (!query) return;
    datafetch();
  }, [query]);

  const cardMaker = () => {
    if (!query) {
      return (
        <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:0.5}}>
            <Instructions />
        </motion.div>);
    }

    if (loading) {
      return (
        <p className="col-span-4 text-center text-gray-700 animate-pulse">
          Searching, please wait...
        </p>
      );
    }

    if (result.length === 0) {
      return (
        <p className="col-span-4 text-center text-gray-700">
          No matches found
        </p>
      );
    }

    return result.map((char, index) => (
      <motion.div
        key={index}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          name={char.attributes.name}
          house={char.attributes.house}
          image={char.attributes.image}
          wiki={char.attributes.wiki}
        />
      </motion.div>
    ));
  };

  return (
    <div className="min-h-screen bg-[#fbcece]">
      <div className="flex justify-center">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={image}
              className="h-35 pt-5 cursor-pointer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
              onClick={() =>
                (window.location.href = "https://harrypotter.fandom.com")
              }
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mt-3">
              <input
                type="text"
                onChange={(e) => setParms(e.target.value)}
                value={parms}
                className="bg-white rounded-t-2xl rounded-b-2xl p-1 pl-5 border-2 border-[#f6bebe] focus:border-fuchsia-400"
                placeholder="Enter name of character"
              />
              <motion.button
                onClick={searchHandle}
                whileHover={{ scale: 1.1, backgroundColor: "#f0777" }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#fc9b9b] pl-3 pr-3 pt-1.5 pb-1 rounded-2xl ml-2 text-shadow-white text-amber-50"
              >
                Search
              </motion.button>
            </div>
          </motion.div>

          {msgBox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex mt-5 bg-red-300 border border-red-400 p-2 text-white">
                {msg}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div
        className={
          !query
            ? "flex justify-center pl-12 pr-12 mt-10"
            : "grid grid-cols-4 gap-3 pl-12 pr-12 mt-10"
        }
      >
        {cardMaker()}
      </div>
    </div>
  );
}

export default App;
