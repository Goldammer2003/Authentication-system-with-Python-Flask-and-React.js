const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      user: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },

      loginToken: async (email, password) => {
        console.log("function called");
        const resp = await fetch(
          "https://3001-goldammer20-authenticat-5042mlqn6s1.ws-eu77.gitpod.io/api/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );
        console.log("after fetch");
        if (!resp.ok) throw "Problem with the response";

        if (resp.status === 401) {
          throw "Invalid credentials";
        } else if (resp.status === 400) {
          throw "Invalid email or password format";
        }

        const data = await resp.json();
        console.log("data", data);
        // save your token in the sessionStorage
        setStore({ user: data });
        sessionStorage.setItem("jwt-token", data.access_token);
        // console.log(loggId)
        return data.access_token;
      },
    },
  };
};

export default getState;
