import {useEffect} from "react";
import {useForm} from "react-hook-form";

const Section = ({children}) => (
  <div className="pt-3">
    <div className="border-b-3 pr-1 pl-1 pb-3 border-b-2 border-light-gray">
      {children}
    </div>
  </div>
);

interface FilterProp {
    onCustomerChange: (r: string[]) => unknown;
    onDateChange: (r: string[]) => unknown;
    onUserChange: (r: string[]) => unknown;
    list: string[];
  }



  export default function Filter(props: FilterProp) {

    const list = props.list

    const Placeholder: string = "Select Customer"

    const sortlist = [0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",]
  
      var sortedlist1: string[] = []
      var sortedlist2: string[] = []
      var sortedlist: string[] = []
      var i = 0
      sortlist.forEach(function(start){
          list.forEach(function(name){
              if(name.startsWith(start.toString())){
                if( i % 2 == 0){
                  sortedlist1.push(name)
                  i = i + 1
                }else{
                  sortedlist2.push(name)
                  i = i + 1
                }

              }
          })
      })

      sortlist.forEach(function(start){
        list.forEach(function(name){
          if(name.startsWith(start.toString())){
            sortedlist.push(name)
          }
        })
      })
      

    const {onCustomerChange,onDateChange, onUserChange} = props;
    const {register, watch, reset} = useForm();

    const users = ["TheodorosChristou", "George"]


    useEffect(() => {
        const subscription = watch((value, {name}) => {
          name === "customer" && onCustomerChange(value["customer"])
          name === "user" && onUserChange(value["user"]);
          name === "date" && onDateChange(value["date"]);
    
        });



        return () => subscription.unsubscribe();
      }, [watch, onCustomerChange, onUserChange, onDateChange]);


      const handleReset = () => {
        reset(() => ({
          customer: [Placeholder],
          user: [],
          date: [],
        }));

        onCustomerChange(["1"]);
        onUserChange([]);
        onDateChange(["1"]);
      };

      return(
        <div className="flex justify-center">
        <form id="form">
        <div className="container bg-white border-r-2 border-light-gray w-64 rounded-md pb-2 pr-2 pl-2">
          <div className="pt-2">
            <div className="flex justify-between border-b-3 pr-1 pl-1 pb-2 border-b-2 border-light-gray">
              <div className="flex items-center">
                <h1 className="font-bold text-xl"> Filter </h1>
              </div>
              <div className="flex items-center">
                <a
                  className="text-sm mt-2 text-blue cursor-pointer"
                  data-test="clear-link"
                  onClick={handleReset}
                >
                  Clear All
                </a>
              </div>
            </div>
          </div>
          <Section>
            <h1 className="font-semibold"> Sort By User</h1>

              {users.map((r, i) => (
                <div key={i} className="flex space-x-2">
                  <input
                    data-test="user-filter"
                    className="cursor-pointer"
                    type="checkbox"
                    {...register("user")}
                    value={users[i]}
                    name="user"
                  ></input>
                  <label className="text-sm">
                    {users[i]}
                  </label>
                </div>
              ))}
          </Section>

          <Section>
            <h1 className="font-semibold"> Sort By Date</h1>
                <div key={i} className="flex space-x-2">
                  <input
                    data-test="date-filter"
                    className="cursor-pointer"
                    type="date"
                    {...register("date")}
                    name="date"
                  ></input>
                </div>
          </Section>

          <Section>
          <select  className="mr-5" {...register("customer") }>
                <option disabled selected>{Placeholder}</option>
                {sortedlist.map((r, i) => (
                    <option value={sortedlist[i]} key={i+1}>{sortedlist[i]}</option>
            ))}
            </select>
          </Section>

        </div>
        </form>
      </div>
      );
}