FORMA DE INICIAR EL CLIENT
npm start
-------------------------------
FORMA DE INICIAR EL JSON SERVER
json-server --watch db.json
-------------------------------

pagina para chofer y para vinologo desconectadas sin borrar para poder usar en el futuro



INFORMACION SOVRE CAMPOS Y ENDPOINTS DE EL SISTEMA
---------------------------
DriverForm
shipmentNumber: Text input for the shipment number (placeholder: "מספר משלוח")
driverName: Text input for the driver's name (placeholder: "שם נהג")
typeOfTruck: Text input for the type of truck (placeholder: "סוג משאית")
vehiclePlate: Text input for the vehicle plate number (placeholder: "מספר רישוי")
contactNumber: Telephone input for the contact number (placeholder: "טלפון ליצירת קשר")
vineyard: Text input for the vineyard name (placeholder: "כרם מעמיס")
departureTime: Time input for the departure time (placeholder: "שעת יציאה")
arrivalTime: Time input for the estimated arrival time (placeholder: "שעת הגעה משוערת")
comments: Textarea for any special instructions (placeholder: "הודאות מיוחדות")

await axios.post('/api/chofer-grape', formData, {
headers: { Authorization: token },
});
--------------------------
EntryForm
shipmentNumber: Text input for the shipment number (placeholder: "מספר משלוח"), required
licensePlateNumber: Text input for the license plate number of the truck (placeholder: "מספר רישוי משאית")
fullTruckWeight: Number input for the full truck weight (placeholder: "משקל משאית מלאה")
emptyTruckWeight: Number input for the empty truck weight (placeholder: "משקל משאית ריקה")
Additional Element:

isAutomatic: (not a form field, but state variable) This variable controls the toggle switch functionality and determines if the system is in automatic mode or not.
Form Buttons:
New Tab Button: This button triggers the handleOnClick function when clicked and opens a new card (for additional entries).
Submit Button: This button triggers the handleSubmit function when clicked and submits the form data.

await axios.post('/api/entrada-fabrica', formData, {
headers: { Authorization: token },
});
---------------------------
GrapeReceptionForm
shipmentNumber: Number input for the shipment number (placeholder: "מספר משלוח"), required
temperature: Number input for the temperature (placeholder: "טֶמפֶּרָטוּרָה")
arrivalTime: Time input for the arrival time at the station (placeholder: "כניסה לעמדה")
departureTime: Time input for the departure time from the station (placeholder: "יציאה מהעמדה")
receivingTank: Text input for the receiving tank (placeholder: "מיכל קבלה")
sentBy: Text input for who sent the grapes (placeholder: "מועבר דרך")
comments: Textarea for any special instructions (placeholder: "הודאות מיוחדות")
Checkbox Fields:

scrambled: Checkbox for "Mixed Varieties" (label: "זנים מעורבים")
rotten: Checkbox for "Rot" (label: "רקבונות")
sulfitAdded1: Checkbox for "Sulfite Added 1" (label: "התוסף סולפית 1")
sulfitAdded2: Checkbox for "Sulfite Added 2" (label: "התוסף סולפית 2")
ensimesAdded: Checkbox for "Enzymes Added" (label: "הוכנסו הנזימים")

axios.post('/api/recibimiento-grape', formData, {
headers: { Authorization: token },
});
---------------------------
LaboratoryForm
shipmentNumber: Este campo almacena el número de envío.
ph: Este campo almacena el valor del pH.
sugarLevel: Este campo almacena el nivel de azúcar.
acidityLevel: Este campo almacena el nivel de acidez.
alcoholContent: Este campo almacena el contenido de alcohol.
colorIntensity: Este campo almacena la intensidad del color.
aromaProfile: Este campo almacena el perfil aromático.

axios.post('/api/laboratorio', dataToSubmit, {
headers: { Authorization: token },
});
---------------------------
VineYardForm
shipmentNumber: Text input for the shipment number (placeholder: "מספר משלוח", required)
conductor: Text input for the driver's name (placeholder: "נֶהָג", required)
vehiclePlate: Text input for the vehicle plate number (placeholder: "מספר רישוי", required)
vineyardName: Text input for the vineyard name (placeholder: "שם הכרם", required)
vineyardArea: Text input for the vineyard area (placeholder: "אזור הכרם")
vineyard: Text input for the plot number (placeholder: "מספר חלקה")
contactPerson: Text input for the contact person at the vineyard (placeholder: "אחראי כרם")
containers: Number input for the number of containers (placeholder: "מספר אמבטיות")
totalWeight: Number input for the total weight of grapes (placeholder: "משקל ענבים")
contactNumber: Telephone input for the contact phone number (placeholder: "טלפון ליצירת קשר")
harvestDate: Time input for the grape harvest time (placeholder: "שעת בצירה", required)
shipmentDate: Time input for the grape shipment time (placeholder: "שעת משלוח", required)
grapeVariety: Select dropdown menu for choosing the grape variety. This utilizes the grapeVarieties array defined outside the component. (required)
kosher: Checkbox for supervisor approval (label: "אישור משגיח")
authorized: Checkbox for manager approval (label: "אישור מנהל")
comments: Textarea for any special instructions (placeholder: "הודאות מיוחדות")

API Endpoint:
The form submission (handleSubmit function) attempts to send a POST request to the /api/vinedo-grape endpoint. 
HTTP Method: POST
Request Body: The formData object will be converted to JSON and sent in the request body. This object contains all the user-entered data for the vineyard.
Headers: The request might include an Authorization header containing the user's token for authentication (not explicitly shown in the provided code snippet).

axios.post('/api/vinedo-grape', formData, {
headers: { Authorization: token },
});
-------------------------------------
RegisterForm
username: Stores the entered username (text input, placeholder: "שם משתמש")
password: Stores the entered password (password input, placeholder: "סיסמה")
role: Stores the selected user role (dropdown menu with various options)

axios.post('/api/register', { username, password, role });
----------------------------------------
LoginForm
password
userName

axios.post('/api/login', { username, password });
localStorage.setItem('token', res.data.token); 
----------------------------------------
END POINTS DE LA PAGINA
/api/entrada-fabrica: Este endpoint se utiliza para registrar la entrada de un producto en una fábrica.
/api/recibimiento-grape: Este endpoint se utiliza para registrar la recepción de grape.
/api/laboratorio: Este endpoint se utiliza para registrar datos de laboratorio.
/api/vinedo-grape: Este endpoint se utiliza para registrar información sobre un viñedo y el envío de grape.
/api/register.
/api/login.