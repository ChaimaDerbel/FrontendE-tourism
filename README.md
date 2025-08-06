# E-Tourism Platform - Experience Module Integration

## Project Overview

This is an E-tourism platform similar to GetYourGuide/Viator, built with Angular 14+ and Angular Material. The platform includes multiple modules for managing different aspects of tourism services.

### Modules
- **Dashboard** - Main overview and analytics
- **Flights** - Flight booking and management
- **Hotels** - Hotel reservations and management
- **Experiences** - Tourist activities and experiences (newly integrated)
- **Visa** - Visa application services
- **ERP** - Enterprise resource planning

## Experience Module Features

### ✅ Complete CRUD Operations
- Create, read, update, and delete experiences
- Advanced search and filtering capabilities
- Image gallery management
- Multi-language support

### 🔍 Advanced Search & Filtering
- Filter by category, price range, location, difficulty
- Real-time search with debouncing
- Pagination support
- Availability filtering

### 📊 Analytics & Statistics
- Popular experiences tracking
- Low stock alerts
- Booking statistics
- Rating and review management

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Backend URL
Update the backend URL in the following files:
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`
- `src/app/experience/services/experience.service.ts`

Replace `http://your-remote-ip:your-port` with your actual backend URL.

### 3. Backend API Endpoints
The Experience module expects the following endpoints:

```
GET    /api/experiences          - List all experiences with filtering
GET    /api/experiences/:id      - Get single experience
POST   /api/experiences          - Create new experience
PUT    /api/experiences/:id      - Update experience
DELETE /api/experiences/:id      - Delete experience
GET    /api/experiences/popular  - Get popular experiences
GET    /api/experiences/low-stock - Get low stock experiences
GET    /api/experiences/stats    - Get experience statistics
```

### 4. Run the Application
```bash
ng serve
```

The application will be available at `http://localhost:4200`

## File Structure

```
src/app/experience/
├── components/
│   ├── experience-list/          # List view with search/filter
│   ├── experience-detail/        # Detailed view of single experience
│   └── experience-form/          # Create/edit form
├── services/
│   └── experience.service.ts     # API communication service
├── models/
│   └── experience.interface.ts   # TypeScript interfaces
├── experience-routing.module.ts  # Module routing
└── experience.module.ts          # Module definition
```

## Key Features

### Experience List Component
- Grid layout with responsive design
- Advanced search and filtering
- Pagination
- Quick actions (edit, delete)
- Loading states and error handling

### Experience Detail Component
- Image gallery with navigation
- Comprehensive experience information
- Rating display
- Booking information
- Responsive design

### Experience Form Component
- Reactive forms with validation
- Dynamic form arrays for images, highlights, etc.
- Multi-step form layout
- Error handling and user feedback

## Technical Stack

- **Frontend**: Angular 14+ with Angular Material
- **Backend**: Node.js/Express with PostgreSQL
- **Styling**: SCSS with Material Design
- **State Management**: RxJS Observables
- **HTTP Client**: Angular HttpClient
- **Forms**: Angular Reactive Forms

## Configuration Notes

1. **Backend Integration**: Update the `BASE_URL` in `experience.service.ts` with your backend URL
2. **Image Handling**: The module supports image URLs. Update placeholder image paths as needed
3. **Authentication**: Add authentication guards if required
4. **Error Handling**: Customize error messages in the service layer

## Development Guidelines

- Follow Angular style guide
- Use TypeScript strict mode
- Implement proper error handling
- Write responsive CSS
- Use Angular Material components consistently
- Implement loading states for better UX

## Deployment

1. Build for production:
```bash
ng build --prod
```

2. Update environment variables for production
3. Deploy to your hosting platform

## Support

For issues or questions regarding the Experience module integration, please refer to the Angular and Angular Material documentation or contact the development team.