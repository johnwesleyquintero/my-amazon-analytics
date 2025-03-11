# Architecture

Rebuilding **full-scale web app + Chrome extension** - **My Amazon Analytics**.

This approach allows users to access the tool both as a **standalone web application** and as a **browser extension**, providing flexibility and enhancing the user experience. Below is a **comprehensive plan** to implement this dual-platform solution using **vite**, **React**, **Supabase**, and **Google Workspace APIs**.

* * * * *
**Reusable Links for Icons and Favicons**
   ```
<link rel="icon" href="https://myamazonguy.com/wp-content/uploads/2022/03/cropped-MAG-FAVICON-32x32.jpeg" sizes="32x32" />
<link rel="icon" href="https://myamazonguy.com/wp-content/uploads/2022/03/cropped-MAG-FAVICON-192x192.jpeg" sizes="192x192" />
<link rel="apple-touch-icon" href="https://myamazonguy.com/wp-content/uploads/2022/03/cropped-MAG-FAVICON-180x180.jpeg" />
<meta name="msapplication-TileImage" content="https://myamazonguy.com/wp-content/uploads/2022/03/cropped-MAG-FAVICON-270x270.jpeg" />
   ```
* * * * *

**Color Palette for Webapp and Extention**

  - White (#FFFFFF) - Used as the main background color for a clean and modern look.
  - Black (#000000) - Used for text and some UI elements for contrast.
  - Yellow (#FFD400 or similar) - Used as an accent color for call-to-action buttons and highlights.
  - Dark Gray (#333333) - Used for secondary text and some background sections.
  - Light Gray (#F5F5F5 or similar) - Used for subtle background differences and section breaks.
  - Blue (#0073E6 or similar) - Possibly used for hyperlinks or emphasis.

* * * * *

**Revamped architecture** along with some **simplified features** for the **my-amazon-analyticse** and its companion extension.

---

### **Revamped Architecture for my-amazon-analyticse**

---

#### **1. Core Components:**
- **Web Application (my-amazon-analyticse):**
  - **Main Dashboard**: Displays KPIs, visual reports, and charts.
  - **Google Sheets Integration**: Syncs campaign and performance data with Google Sheets for storage and further analysis.
  - **Role-Based Access**: Permissions for users (Admin, User, Viewer) to control who can access and modify reports.
  - **Reporting & Automation**: Simple automation to schedule report generation and send notifications to users (email/within app).
  
- **Browser Extension:**
  - **Amazon Seller Central Integration**: Fetches data directly from Amazon Seller Central (e.g., Search Query Performance, Campaign Data).
  - **Drag-and-Drop Bulk Upload**: Users can drag and drop files (CSV, XLS) from Amazon Seller Central and upload them into Google Sheets, facilitating easy data entry.
  - **Real-Time Sync**: Data fetched via the extension is automatically synced with the web app and Google Sheets.
  - **Simplified User Interface**: Small, lightweight extension to provide a quick overview and easy access to Amazon reports.

---

#### **2. Data Flow:**
1. **User Authentication**:
   - **OAuth**: Secure sign-in for both the web app and extension using **NextAuth.js** (Google, Amazon Seller Central authentication).
   
2. **Fetching Data**:
   - **Amazon Seller Central Integration**:
     - The extension can fetch campaign data, SQP data, and other key metrics from Seller Central.
     - The user can click on specific campaign data or reports and either **view** in the extension or **sync** it with the web app and Google Sheets.
   
3. **Drag-and-Drop File Upload (via Extension)**:
   - **User Action**: Drag files from Amazon Seller Central or their device.
   - The extension will upload these files (CSV/XLS) to the **Google Sheets** linked to the user’s my-amazon-analyticse account.

4. **Real-Time Sync**:
   - Data that is fetched via the extension will be **automatically synced** with the Google Sheets linked to the user’s account in the web app.
   - Updates from the web app will also be reflected back into the extension for quick reference.
   
5. **Notifications & Alerts**:
   - The web app and extension will notify users of new uploads, sync status, or any issues.

---

#### **3. Simplified Features (for both Web App & Extension)**:

1. **Web App**:
   - **Dashboard Overview**: Visualize key metrics like **Search Query Performance**, **Campaign Metrics**, and **Product Sales**.
   - **Simple Reporting**: Generate weekly/monthly performance reports that automatically populate Google Sheets.
   - **Basic Automation**: Set up scheduled tasks to fetch updated campaign data from Amazon at regular intervals.
   - **Google Sheets Sync**: Directly sync all data to Google Sheets for users who prefer working with spreadsheets.
   - **Role-Based Permissions**: Easy-to-manage access for different user roles (Admin, User, Viewer).

2. **Extension**:
   - **Quick Data Fetch**: Click to pull live data (Campaign Performance, SQP, etc.) directly from Seller Central.
   - **Drag-and-Drop File Upload**: Drag files (CSV/XLS) into the extension to upload into Google Sheets, saving time and reducing manual entry.
   - **Live Sync**: Real-time data sync with the web app and Google Sheets.
   - **Compact Dashboard**: View key metrics at a glance, like the top-performing campaigns or products, without opening the web app.

---

### **Revised User Flow (Simplified)**:

1. **User Signs In:**
   - Authentication via **OAuth** for both the **web app** and **extension** (Google and Amazon Seller Central).
   
2. **Using the Extension**:
   - User installs the extension, links their **Amazon Seller Central account**, and can **fetch campaign data** or **export files** directly from Amazon.
   - **Drag-and-drop** files into the extension for quick bulk upload into **Google Sheets** linked to their my-amazon-analyticse account.

3. **Data Sync**:
   - Extension automatically **syncs data** with the **web app** in real time, reflecting all new changes, campaign updates, and performance metrics.

4. **Web App Interaction**:
   - The user views updated **KPIs** and **reports** on the web app’s dashboard.
   - They can schedule automated tasks to pull and update performance data without manual effort.

5. **Notifications**:
   - The system will notify users in both the extension and web app when tasks are completed or require attention (e.g., file upload complete, new report generated).

---

### **Suggestions for Simplicity:**

1. **Lightweight Features**: 
   - Avoid overwhelming users with too many features. Focus on **data fetching**, **file upload**, and **real-time sync**.
   - Limit the dashboard to just essential KPIs, with easy-to-understand charts and metrics.

2. **User-Friendly UI**:
   - Both the **web app** and **extension** should have an intuitive, minimalistic UI, focusing on usability over complex functionality.

3. **Quick Access to Reports**:
   - Enable **one-click report generation** for campaign data directly from Amazon Seller Central, with the option to automatically update Google Sheets.

4. **Automation**:
   - Focus on **simple automation**: Automate data syncs, report updates, and file uploads without requiring complex user interaction.

5. **Seamless Integration**:
   - Keep the web app and extension synchronized at all times to ensure a smooth user experience, with no manual syncing needed.

---

### **Final Thoughts**:
By streamlining the features, we're making sure the app stays **easy to use** while maintaining powerful integration with **Amazon Seller Central**. The browser extension works as a lightweight companion tool, giving users quick access to data, while the web app centralizes reporting and syncs with **Google Sheets** for data storage.

