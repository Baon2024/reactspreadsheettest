import logo from './logo.svg';
import './App.css';
import Spreadsheet from "react-spreadsheet";
import { useEffect, useState } from 'react';
import TopBar from './topBar';
import { ToastContainer, toast } from 'react-toastify';
import ContextDrawer from './contextDrawer';
//import { Button, Navbar, Dropdown, Spinner, Toast } from 'flowbite-react';


export default function App() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState({ success: 0, failed: 0, total: 0 });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [contextText, setContextText] = useState("This spreadsheet contains contact information for various professionals.");
  const [data, setData] = useState([
    [{ value: "+447912345678" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "+447912345679" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "+447912345680" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }]
  ]);
  
  const customStyles = {
    border: "2px solid blue",
    fontSize: "16px",
  };
  

  const columnLabels = ["Phone Number", ""];

  //presumabky just create lots of entry rows at the start
  //can always allow users to create new rows/columns later, programatically

  async function onClick() {
    console.log("value of data is:", data);
    const prevData = data;
    console.log("prevData is:", prevData);

    const newData = [
      { value: 'dogs' },
      { value: 'food' },
      { value: 'stuff' }
    ]
    console.log("value of newData is:", newData);
    
    // Append the new row correctly
  const updatedData = [...prevData, newData];

  console.log("Updated data:", updatedData);

  setData(updatedData);
    
  }

  useEffect(() => {
    console.log("this is the value of the data:", data);
  },[data])

  async function addRow() {
    const newData = [{ value: ""}];


    const prevData = data;

    const updatedData = [...prevData, newData];
    setData(updatedData);
  }

  async function addColumn() {
    const newData = { value: ""};

    const prevData = data;

    /*prevData.forEach((row, index) => {
      console.log(`this is what this row ${index} looks like:`, row);
      row.push(newData);
      console.log("value of row after adding newData is:", row);
    })*/

    
  // Create a new updated data array
  const updatedData = data.map(row => [...row, { ...newData }]);

    
    console.log("updatedData after adding column:", updatedData);
    setData(updatedData);
  }

  useEffect(() => {
    console.log("callStatus after filtering now is:", callStatus);
  },[callStatus]);

  const makePhoneCall = async (phoneNumber) => {
    try {
      // Format the phone number with +44 prefix
      let formattedNumber = phoneNumber.toString().trim().replace(/\s+/g, '');

    // UK phone number regex: 
    // - Mobile: starts with +447 or 07 followed by 9 more digits
    // - Landline: starts with +44 and a valid area code, or 01 / 02 with 8-10 digits
    const ukPhoneRegex = /^(?:\+44(7\d{9}|1\d{8,9}|2\d{8,9})|07\d{9}|01\d{8,9}|02\d{8,9})$/;

    // Validate formatted number
    if (!ukPhoneRegex.test(formattedNumber)) {
      console.error(`Invalid UK phone number: ${formattedNumber}`);
      setToastMessage(`Invalid UK phone number: ${formattedNumber}`);
      setToastType('warning');
      setShowToast(true);
      setIsLoading(false);
      return;
    }

    // Format the number
    if (formattedNumber.startsWith('+44')) {
      // Already correctly formatted
    } else if (formattedNumber.startsWith('+')) {
      // Already has another country code, reject it
      console.error(`Invalid UK phone number: ${formattedNumber}`);
      return;
    } else if (formattedNumber.startsWith('0')) {
      // Convert leading 0 to +44
      formattedNumber = '+44' + formattedNumber.substring(1);
    } else {
      console.error(`Invalid UK phone number: ${formattedNumber}`);
      setToastMessage(`Invalid UK phone number: ${formattedNumber}`);
      setToastType('warning');
      setShowToast(true);
      setIsLoading(false);
      return;
    }

    

      //this correctly returns error for those that don't match
    if (!contextText) {
      console.error(`No context text set`);
      setToastMessage(`No context text set`);
      setToastType('warning');
      setShowToast(true);
      setIsLoading(false);
      return;
    }
      
      console.log(`Making call to formatted number: ${formattedNumber} (original: ${phoneNumber})`);
      
      /*const response = await fetch('http://localhost:5003/makeCall', { //so this sends data to backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "phone_number": formattedNumber,
          "task": contextText,
          "voice": "Josh", //does this need to be sent from the frontend??
          "wait_for_greeting": true //does this need to be sent from the frontend??
        })
      });*/

      const spoofData = { formattedNumber, contextText}

      const response = await fetch('http://localhost:5005/spoofEndpoint', { //so this sends data to backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(spoofData)
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      
      const data = await response.json();
      console.log("data before response.json() is:", data);
      console.log(`Call initiated for ${formattedNumber}:`, "data returned is:", data);
      //return true; - not sure why original code returned true??
      return data;
    } catch (error) {
      console.error(`Error initiating call to ${phoneNumber}:`, error);
      return false;
    }
  };

  const handleEnrichClick = async () => {
    //need to replace this all with my code, passing down spreadsheetData as a child to be used by this function

    
  
      if (!data) {
        setToastMessage('Cannot access spreadsheet data');
        setToastType('error');
        setShowToast(true);
        return;
      }
  
      //need code if context doesn't exist
      console.log("data inside of handleEnrichClick is:", data);
  
      setIsLoading(true);
      setCallStatus({ success: 0, failed: 0, total: 0 });
  
      
       

     
      //function to return row phone numbers that exist
      const getPhoneNumbers = (data) => {
        return data
          .map(row => row[0]?.value) // Extract the first column's value
          .filter(value => value && value.startsWith("+")); // Keep only valid phone numbers
      };
      
      // get rows with phone numbers that exist:
      const phoneNumbers = getPhoneNumbers(data);
      console.log("phoneNumbers returned from data:",phoneNumbers);

      //tell user if there are no numbers to call
      if (phoneNumbers.length === 0) {
        //setToastMessage('No phone numbers found to call.');
        toast.error('No phone numbers found');
        setToastType('warning');
        setShowToast(true);
        setIsLoading(false);
        return;
      }
      
      //update number of phone calls needed to make
      setCallStatus(prev => ({ ...prev, total: phoneNumbers.length }));
    
      
      
         
      // Make calls sequentially to avoid overwhelming the API
      let successCount = 0;
      let dataFromCalls = [];
        
      
      for (const phoneNumber of phoneNumbers) {
        const success = await makePhoneCall(phoneNumber); //this is where call to backend for blank.ai phone call occurs
        //its clear to me that should also send the contextPrompt too, to send relevant answers 
        //but first lets just get a basic call working
        console.log("value of success is:", success);
        
        if (success) {
          successCount++;
          setCallStatus(prev => ({ ...prev, success: prev.success + 1 }));
        } else {
          setCallStatus(prev => ({ ...prev, failed: prev.failed + 1 }));
        }
  
        //const entry = [ phoneNumber, success];
        const entry = [phoneNumber, ...success.flat()];
        console.log("value of entry is:", entry);
        //if success variable contains returned data for the phonecall, add to dataFromCalls
        dataFromCalls.push(entry);
        

      }
      console.log("dataFromCalls looks like this after all success call data returned and put in array:", dataFromCalls);
      //setData(dataFromCalls);
      //here, you'll need to transform dataFromCalls into the correct format to manually update workbookData
      //i presume this is the more manual cursor generated code, for turning the array into the correct structure
        //const formattedDataFromCalls = dataFromCalls.forEach(/*call, index code to format each array member );*/
      //in the code, format data in needed format, and add the phonenumber for each index from formattedData above: formattedData[index]
        //console.log("formattedDataFromCalls looks like this after formatting dataFromCalls:", formattedDataFromCalls);
        function insertReturnedData(returnedData) {
          setData(prevData => {
            // Create a new array to avoid mutation
            return prevData.map(row => {
              // Find matching phone number
              const match = returnedData.find(item => item[0] === row[0].value);
              console.log("value of match is:", match);
              
              if (match) {
                return [
                  { value: match[0] }, // Keep phone number
                  ...match.slice(1).map(value => ({ value })) // Map all additional values
                ];
              }
        
              return row; // If no match, keep row unchanged
            });
          });
        }
        insertReturnedData(dataFromCalls);
     //need to format returned data
    }
     
    const handleContextUpdate = (newContext) => {
      setContextText(newContext);
      // In a real app, you would also save this to a database or API
      console.log("Context updated:", newContext);
    };

  return (
    <div className="App">
        <TopBar handleEnrichClick={handleEnrichClick} addRow={addRow} addColumn={addColumn} />
        <Spreadsheet data={data} onChange={setData} columnLabels={columnLabels} styles={customStyles} />
        <ContextDrawer onContextUpdate={handleContextUpdate} contextData={contextText} />
    </div>
  );
}
