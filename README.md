# ⛽ Fuel Management System - Mont-Gabaon Airlines

A comprehensive fuel inventory management system designed specifically for airline operations, featuring role-based interfaces and real-time stock tracking.

![React](https://img.shields.io/badge/React-18.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 🚀 Features

### 👨‍💼 Administration
- **Director Management**: Create and manage department heads
- **System Overview**: Global view of all operations and metrics
- **User Access Control**: Centralized user permission management

### 📊 Dispatch Operations
- **Stock Management**: Fuel inventory tracking and replenishment
- **Flight Planning**: Create flight plans with pilot assignments
- **Daily Reporting**: Comprehensive daily flight operations reports
- **Team Management**: Create and manage dispatch team members

### ✈️ Flight Operations
- **Pilot Management**: Create pilot accounts with credentials
- **Captain Reports**: Monitor and review pilot fuel consumption reports
- **Fleet Oversight**: Track active pilots and flight assignments
- **Operations Team**: Manage operations department personnel

### 💰 Finance Department
- **Cost Analysis**: Detailed fuel cost analysis per flight
- **Efficiency Metrics**: Fuel usage efficiency tracking and reporting
- **Financial Reporting**: Comprehensive financial insights and recommendations
- **Budget Tracking**: Monitor fuel expenses and waste reduction

### 👨‍✈️ Pilot Interface
- **Flight Assignments**: View assigned flights and fuel allocations
- **Captain Reports**: Submit detailed fuel consumption reports
- **Stock Visibility**: Real-time fuel stock monitoring
- **Simple Dashboard**: Streamlined interface for operational efficiency

## 🛠️ Technology Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Version Control**: Git & GitHub

## 📦 Installation

### Prerequisites
- Node.js (version 16.0 or higher)
- npm or yarn package manager
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/Mertha25/mont-gabaon-fuel-system.git
cd mont-gabaon-fuel-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Tailwind CSS**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. **Start the development server**
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Accounts

| Role | Username | Password | Department |
|------|----------|----------|------------|
| **System Admin** | `admin` | `admin123` | Administration |
| **Dispatch Director** | `dir_dispatch` | `dispatch123` | Dispatch |
| **Operations Director** | `dir_ops` | `ops123` | Flight Operations |
| **Finance Director** | `dir_finance` | `finance123` | Finance |
| **Pilot** | `pilot1` | `pilot123` | Flight Operations |

## 🏗️ System Architecture

### Role-Based Access Control
- **Departmental Isolation**: Each department can only access their specific data
- **Hierarchical Permissions**: Directors can manage their team members
- **Secure Authentication**: Password-protected access with role validation

### Data Flow
1. **Dispatch** creates flight plans with fuel requirements
2. **Pilots** complete captain reports after flights
3. **Stock** updates automatically based on actual consumption
4. **Finance** generates cost reports from consumption data

## 📱 User Interface

### Dashboard Features
- **Real-time Metrics**: Live fuel stock, flight counts, and consumption data
- **Department-Specific Views**: Customized dashboards per user role
- **Activity Tracking**: Recent system activities and notifications
- **Visual Analytics**: Charts and graphs for data visualization

### Responsive Design
- **Mobile-First**: Optimized for tablets and mobile devices
- **Modern UI**: Clean, professional interface with intuitive navigation
- **Accessibility**: WCAG compliant design with proper contrast ratios

## 🔄 Available Scripts

### Development
```bash
npm start          # Start development server
npm test           # Run test suite
npm run build      # Build for production
npm run eject      # Eject from Create React App
```

### Production
```bash
npm run build      # Create optimized production build
npm run preview    # Preview production build locally
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```
The build folder will contain the production-ready files.

### Deployment Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect GitHub repository for automatic deployments
- **AWS S3**: Upload build files to S3 bucket with CloudFront
- **Traditional Hosting**: Upload build folder to web server

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Future Enhancements

- [ ] **API Integration**: Connect to backend services
- [ ] **Real-time Notifications**: Push notifications for critical alerts
- [ ] **Advanced Analytics**: Machine learning for fuel consumption predictions
- [ ] **Mobile App**: Native mobile application for pilots
- [ ] **Integration**: Connect with existing airline management systems
- [ ] **Multi-language Support**: French and English language options

## 🐛 Known Issues

- Tailwind CSS configuration may require manual setup
- Demo data is stored in local state (will be replaced by API)

## 📞 Support

For technical support or questions:
- **GitHub Issues**: [Create an issue](https://github.com/Mertha25/mont-gabaon-fuel-system/issues)
- **Documentation**: Check the project wiki for detailed guides


## 🙏 Acknowledgments

- **Mont-Gabaon Airlines** for the project requirements and specifications
- **React Team** for the excellent development framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon library

---

**Built with ❤️ for Mont-Gabaon Airlines**

*Professional fuel management for modern aviation operations*
