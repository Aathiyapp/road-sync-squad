import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";
import { 
  MapPin, 
  Users, 
  Vote, 
  Shield, 
  Navigation, 
  MessageCircle,
  ArrowRight,
  Zap
} from "lucide-react";

const HeroSection = () => {
  const features = [
    {
      icon: MapPin,
      title: "Real-time Location",
      description: "Track your group in real-time"
    },
    {
      icon: Vote,
      title: "Dynamic Voting",
      description: "Change destinations on the fly"
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Emergency SOS and tracking"
    },
    {
      icon: Users,
      title: "Group Planning",
      description: "Collaborate with your crew"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-adventure rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-sunset rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Main Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Beta Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Zap className="h-4 w-4 mr-1" />
              Beta Version - Join the Revolution
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Ride Together.
            </span>
            <br />
            <span className="text-foreground">
              Decide Together.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The first collaborative riding platform where groups can track each other in real-time, 
            vote on destinations, and make every journey an adventure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <NavLink to="/dashboard">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Start Your Ride
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </NavLink>
            
            <NavLink to="/create-ride">
              <Button variant="adventure" size="lg" className="text-lg px-8 py-4">
                Create Group
                <Users className="h-5 w-5 ml-2" />
              </Button>
            </NavLink>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>127 Active Riders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>23 Live Groups</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span>1,247 km Today</span>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl shadow-card hover:shadow-adventure transition-all duration-300 hover:scale-105 border border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-primary p-3 rounded-xl w-fit mb-4">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Demo Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            See RideSync in Action
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Watch how groups collaborate in real-time to plan the perfect ride
          </p>
          
          {/* Demo Visual */}
          <div className="bg-gradient-to-br from-card to-card/50 rounded-3xl p-8 max-w-4xl mx-auto shadow-glow border border-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Step 1 */}
              <div className="space-y-4">
                <div className="bg-gradient-primary rounded-xl p-4 text-center">
                  <Navigation className="h-8 w-8 text-primary-foreground mx-auto mb-2" />
                  <div className="text-primary-foreground font-semibold">Plan Route</div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">1. Start Planning</h4>
                  <p className="text-sm text-muted-foreground">
                    Create a ride group and set initial destination
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-4">
                <div className="bg-gradient-adventure rounded-xl p-4 text-center">
                  <Users className="h-8 w-8 text-adventure-foreground mx-auto mb-2" />
                  <div className="text-adventure-foreground font-semibold">Invite Riders</div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">2. Build Your Crew</h4>
                  <p className="text-sm text-muted-foreground">
                    Invite friends or find nearby riders to join
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-4">
                <div className="bg-gradient-sunset rounded-xl p-4 text-center">
                  <Vote className="h-8 w-8 text-secondary-foreground mx-auto mb-2" />
                  <div className="text-secondary-foreground font-semibold">Ride & Vote</div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">3. Dynamic Adventure</h4>
                  <p className="text-sm text-muted-foreground">
                    Vote to change route, add stops, and explore together
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;