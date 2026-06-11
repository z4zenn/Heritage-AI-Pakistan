import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Crown, MapPin, Landmark, Calendar, Users, Calculator, MessageSquare, Compass, ShieldCheck } from 'lucide-react';
import SiteCard from '../components/SiteCard';
import { siteData } from '../data/siteData';
import HeritageChatbot from '../components/HeritageChatbot';


export default function SiteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find site
  const site = siteDatabase[id] || siteDatabase['lahore-fort'];

  // Tabs state
  const [activeTab, setActiveTab] = useState('Overview');

  // Booking widget states
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [groupSize, setGroupSize] = useState(1);

  // Map state & references
  const [mapError, setMapError] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const googleMapInstance = useRef(null);

  // Haversine distance calculator helper
  const getHaversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Google Maps JS API script dynamic loader
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
      setMapError(true);
      return;
    }

    const scriptId = 'google-maps-api-script';
    let script = document.getElementById(scriptId);

    const initMap = () => {
      setMapLoaded(true);
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=__initGoogleMap`;
        script.async = true;
        script.defer = true;
        
        window.__initGoogleMap = () => {
          initMap();
          delete window.__initGoogleMap;
        };

        script.onerror = () => {
          setMapError(true);
        };

        document.head.appendChild(script);
      } else {
        const interval = setInterval(() => {
          if (window.google && window.google.maps) {
            initMap();
            clearInterval(interval);
          }
        }, 100);
        return () => clearInterval(interval);
      }
    }
  }, []);

  // Map Instance and Markers lifecycle hook
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !window.google || !window.google.maps) return;

    const mapOptions = {
      center: { lat: Number(site.lat), lng: Number(site.lon) },
      zoom: 14,
      mapTypeId: 'roadmap',
      styles: [
        { elementType: "geometry", stylers: [{ color: "#1a1f23" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#141618" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#C8B89A" }] },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#23282D" }]
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#3D494F" }]
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#EDE9DF" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#0f1a1c" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#1D9E75" }]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#1e2428" }]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#1a2e20" }]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#23282D" }]
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [{ color: "#3D494F" }]
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [{ color: "#C8B89A" }]
        }
      ],
      disableDefaultUI: true,
      clickableIcons: false,
      scrollwheel: true,
      draggable: true
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);
    googleMapInstance.current = map;

    // Custom Zoom Controls Style Injection
    const zoomControlDiv = document.createElement('div');
    zoomControlDiv.style.margin = '16px';
    zoomControlDiv.style.display = 'flex';
    zoomControlDiv.style.flexDirection = 'column';
    zoomControlDiv.style.gap = '6px';

    const zoomInBtn = document.createElement('button');
    zoomInBtn.innerHTML = '+';
    zoomInBtn.type = 'button';
    zoomInBtn.style.width = '36px';
    zoomInBtn.style.height = '36px';
    zoomInBtn.style.backgroundColor = '#23282D';
    zoomInBtn.style.color = '#EDE9DF';
    zoomInBtn.style.border = '0.5px solid #3D494F';
    zoomInBtn.style.borderRadius = '8px';
    zoomInBtn.style.fontSize = '20px';
    zoomInBtn.style.fontWeight = 'normal';
    zoomInBtn.style.cursor = 'pointer';
    zoomInBtn.style.display = 'flex';
    zoomInBtn.style.alignItems = 'center';
    zoomInBtn.style.justifyContent = 'center';
    zoomInBtn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
    zoomInBtn.style.outline = 'none';

    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.innerHTML = '−';
    zoomOutBtn.type = 'button';
    zoomOutBtn.style.width = '36px';
    zoomOutBtn.style.height = '36px';
    zoomOutBtn.style.backgroundColor = '#23282D';
    zoomOutBtn.style.color = '#EDE9DF';
    zoomOutBtn.style.border = '0.5px solid #3D494F';
    zoomOutBtn.style.borderRadius = '8px';
    zoomOutBtn.style.fontSize = '20px';
    zoomOutBtn.style.fontWeight = 'normal';
    zoomOutBtn.style.cursor = 'pointer';
    zoomOutBtn.style.display = 'flex';
    zoomOutBtn.style.alignItems = 'center';
    zoomOutBtn.style.justifyContent = 'center';
    zoomOutBtn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
    zoomOutBtn.style.outline = 'none';

    zoomInBtn.addEventListener('click', () => map.setZoom(map.getZoom() + 1));
    zoomOutBtn.addEventListener('click', () => map.setZoom(map.getZoom() - 1));

    zoomControlDiv.appendChild(zoomInBtn);
    zoomControlDiv.appendChild(zoomOutBtn);

    map.controls[window.google.maps.ControlPosition.BOTTOM_RIGHT].push(zoomControlDiv);

    // Primary Marker Creation (Teardrop shape + monument logo)
    const primaryMarkerSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30" width="36" height="44">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 6.5 10 16 10 16s10-9.5 10-16c0-5.5-4.5-10-10-10z" fill="#1D9E75" stroke="#FFFFFF" stroke-width="1.5"/>
        <text x="12" y="15" font-size="10" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">🏛</text>
      </svg>
    `;

    const primaryMarker = new window.google.maps.Marker({
      position: { lat: Number(site.lat), lng: Number(site.lon) },
      map: map,
      title: site.name,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(primaryMarkerSvg),
        scaledSize: new window.google.maps.Size(36, 44),
        anchor: new window.google.maps.Point(18, 44)
      }
    });

    const primaryInfoWindowHtml = `
      <div style="padding: 8px; font-family: 'Outfit', sans-serif; background-color: #23282D; border: 0.5px solid #3D494F; border-radius: 8px; color: #EDE9DF; min-width: 180px;">
        <h4 style="font-family: 'Libre Baskerville', Georgia, serif; font-weight: bold; font-size: 14px; margin: 0 0 6px 0; color: #EDE9DF;">${site.name}</h4>
        <p style="font-size: 11px; margin: 0; color: #C8B89A;">${site.city}, ${site.province}</p>
      </div>
    `;

    const primaryInfoWindow = new window.google.maps.InfoWindow({
      content: primaryInfoWindowHtml
    });

    primaryMarker.addListener('click', () => {
      primaryInfoWindow.open(map, primaryMarker);
    });

    // Query for nearby sites within 100km
    const nearbySites = siteData
      .filter(s => s.id !== site.id)
      .map(s => {
        const dist = getHaversineDistance(Number(site.lat), Number(site.lon), Number(s.lat), Number(s.lon));
        return { ...s, distance: dist };
      })
      .filter(s => s.distance <= 100)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);

    const markersList = [primaryMarker];
    const infoWindowsList = [primaryInfoWindow];

    nearbySites.forEach(s => {
      const secondaryMarkerSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30" width="26" height="32">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 6.5 10 16 10 16s10-9.5 10-16c0-5.5-4.5-10-10-10z" fill="#C8B89A" stroke="#FFFFFF" stroke-width="1.2"/>
          <text x="12" y="14" font-size="8" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">🏛</text>
        </svg>
      `;

      const secondaryMarker = new window.google.maps.Marker({
        position: { lat: Number(s.lat), lng: Number(s.lon) },
        map: map,
        title: s.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(secondaryMarkerSvg),
          scaledSize: new window.google.maps.Size(26, 32),
          anchor: new window.google.maps.Point(13, 32)
        }
      });

      const secondaryInfoWindowHtml = `
        <div style="padding: 8px; font-family: 'Outfit', sans-serif; background-color: #23282D; border: 0.5px solid #3D494F; border-radius: 8px; color: #EDE9DF; min-width: 160px;">
          <h4 style="font-family: 'Libre Baskerville', Georgia, serif; font-weight: bold; font-size: 13px; margin: 0 0 4px 0; color: #EDE9DF;">${s.name}</h4>
          <p style="font-size: 10px; margin: 0 0 6px 0; color: #C8B89A;">${s.city}, ${s.province} (${Math.round(s.distance)} km away)</p>
          <a href="/site/${s.id}" style="font-size: 11px; font-weight: bold; color: #1D9E75; text-decoration: none; display: inline-block;">View Site →</a>
        </div>
      `;

      const secondaryInfoWindow = new window.google.maps.InfoWindow({
        content: secondaryInfoWindowHtml
      });

      secondaryMarker.addListener('click', () => {
        secondaryInfoWindow.open(map, secondaryMarker);
      });

      markersList.push(secondaryMarker);
      infoWindowsList.push(secondaryInfoWindow);
    });

    // Cleanup listeners and markers
    return () => {
      markersList.forEach(m => {
        window.google.maps.event.clearInstanceListeners(m);
        m.setMap(null);
      });
      infoWindowsList.forEach(iw => iw.close());
      if (googleMapInstance.current) {
        googleMapInstance.current = null;
      }
    };
  }, [mapLoaded, site.id]);

  // Calculations
  const baseTicket = site.unescoListed ? 800 : 500;
  const guideFee = 1200;
  const ticketSubtotal = baseTicket * groupSize;
  const guideSubtotal = guideFee * groupSize;
  const totalPKR = ticketSubtotal + guideSubtotal;

  const handleBookRedirect = (e) => {
    e.preventDefault();
    navigate(`/book/${site.id}?date=${date}&groupSize=${groupSize}`);
  };

  const getProvinceBadge = (prov) => {
    switch (prov) {
      case 'Punjab': return 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-900/60';
      case 'Sindh': return 'bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-900/60';
      case 'KPK': return 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-900/60';
      case 'Balochistan': return 'bg-orange-100 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-900/60';
      case 'Gilgit-Baltistan': return 'bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-900/60';
      case 'AJK': return 'bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-900/60';
      default: return 'bg-stone-100 dark:bg-stone-900/40 text-stone-800 dark:text-stone-300 border-stone-300 dark:border-stone-800';
    }
  };

  // 4 recommendations (filter out current site)
  const similarSites = siteData.filter(s => s.id !== site.id).slice(0, 4);

  return (
    <div className="flex-1 w-full bg-[#FAF6F0] dark:bg-[#121212] max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6 select-none transition-colors duration-300">
      
      {/* 1. Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-xs font-sans text-stone-500 dark:text-stone-400">
        <Link to="/" className="hover:text-[#A0522D] dark:hover:text-[#D4A843] transition-colors">Home</Link>
        <span>/</span>
        <Link to="/explore" className="hover:text-[#A0522D] dark:hover:text-[#D4A843] transition-colors">Explore</Link>
        <span>/</span>
        <span className="text-[#2D1B00] dark:text-[#FAF6F0] font-semibold">{site.name}</span>
      </div>

      {/* 2. Large Earthy Placeholder Hero Image Div */}
      <div className="relative aspect-[21/9] w-full bg-stone-200 dark:bg-stone-850/80 border border-[#A0522D]/10 dark:border-[#FAF6F0]/10 rounded-2xl flex flex-col items-center justify-center text-stone-600 dark:text-stone-300 gap-1.5 p-6 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-stone-300/40 dark:bg-stone-900/60 flex items-center justify-center mb-1">
          <Landmark className="w-8 h-8 text-stone-700 dark:text-stone-300" />
        </div>
        <span className="text-sm font-mono font-bold tracking-widest uppercase">
          [ Site Image Banner Placeholder ]
        </span>
        <span className="text-xs text-stone-400 dark:text-stone-500 font-sans">{site.siteType} · GPS Coordinates: {site.lat}, {site.lon}</span>

        {/* Floating UNESCO indicator if applicable */}
        {site.unescoListed && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FAF6F0] dark:bg-[#1C1C1C] text-[#D4A843] border border-[#D4A843]/30 text-xs font-bold font-sans shadow-md uppercase tracking-wider">
              <Crown className="w-4 h-4 fill-[#D4A843] text-[#D4A843]" />
              <span>UNESCO World Heritage</span>
            </span>
          </div>
        )}
      </div>

      {/* 3. Header Section (Title and badges) */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#2D1B00] dark:text-[#FAF6F0] leading-tight">
          {site.name}
        </h1>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className={`px-3 py-0.5 rounded text-[11px] font-bold font-sans border tracking-wider uppercase ${getProvinceBadge(site.province)}`}>
            {site.province}
          </span>
          <span className="px-3 py-0.5 rounded text-[11px] font-bold font-sans border border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 tracking-wider uppercase">
            {site.city}
          </span>
          <span className="px-3 py-0.5 rounded text-[11px] font-bold font-sans border border-[#A0522D]/20 dark:border-[#D4A843]/30 bg-[#A0522D]/5 dark:bg-[#D4A843]/10 text-[#A0522D] dark:text-[#D4A843] tracking-wider uppercase">
            {site.civilizationEra}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold font-sans text-[#2D1B00] dark:text-[#FAF6F0]">
            <Star className="w-4 h-4 text-[#D4A843] fill-[#D4A843]" />
            <span>{site.satisfactionRating} / 5.0 Visitor Rating</span>
          </span>
        </div>
      </div>

      {/* 3.5 Map Section */}
      <div className="space-y-3">
        <span className="font-bold text-[#A0522D] dark:text-[#D4A843] uppercase tracking-wider text-[10px] block font-sans">
          Location & Nearby Sites
        </span>
        
        {mapError ? (
          <div className="w-full h-[280px] md:h-[420px] rounded-2xl border-[0.5px] border-[#3D494F] bg-[#1a1f23] flex items-center justify-center text-[#C8B89A] font-sans text-xs">
            <span>Map unavailable — add VITE_GOOGLE_MAPS_API_KEY to .env</span>
          </div>
        ) : (
          <div 
            ref={mapRef} 
            className="w-full h-[280px] md:h-[420px] rounded-2xl overflow-hidden border-[0.5px] border-[#3D494F] bg-[#1a1f23]"
          />
        )}

        <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-[#C8B89A]">
          <span>GPS Coordinates: {site.lat}, {site.lon}</span>
          <span className="opacity-50">·</span>
          <span>{site.city}</span>
          <span className="opacity-50">·</span>
          <span>{site.province}</span>
        </div>
      </div>

      {/* 4. Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
        
        {/* Left Side: Overview & Details (7 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Historical Description */}
          <div className="bg-[#FAF6F0] dark:bg-[#1C1C1C] p-6 border border-[#A0522D]/10 dark:border-[#FAF6F0]/10 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#A0522D] dark:text-[#D4A843] border-b border-[#A0522D]/10 dark:border-[#FAF6F0]/10 pb-3 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#D4A843]" />
              <span>Description & Context</span>
            </h2>
            <p className="text-sm font-sans font-medium text-[#2D1B00] dark:text-[#FAF6F0]/85 leading-relaxed">
              {site.description}
            </p>
            <div className="text-xs bg-[#A0522D]/5 dark:bg-[#D4A843]/10 border border-[#A0522D]/10 dark:border-[#D4A843]/20 p-4 rounded-xl flex flex-col gap-1">
              <span className="font-bold text-[#A0522D] dark:text-[#D4A843] uppercase tracking-wider text-[10px]">Excavated Era Period</span>
              <span className="text-[#2D1B00] dark:text-[#FAF6F0] font-semibold">{site.period}</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-[#FAF6F0] dark:bg-[#1C1C1C] p-6 border border-[#A0522D]/10 dark:border-[#FAF6F0]/10 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#A0522D] dark:text-[#D4A843] border-b border-[#A0522D]/10 dark:border-[#FAF6F0]/10 pb-3">
              Monument Highlights
            </h2>
            <ul className="space-y-2.5 text-xs text-[#2D1B00]/85 dark:text-[#FAF6F0]/80 font-sans">
              {site.highlights.map((high, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#A0522D]/10 dark:bg-[#D4A843]/10 text-[#A0522D] dark:text-[#D4A843] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed font-semibold">{high}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visitor Tips */}
          <div className="bg-[#FAF6F0] dark:bg-[#1C1C1C] p-6 border border-[#A0522D]/10 dark:border-[#FAF6F0]/10 rounded-2xl shadow-sm space-y-3.5">
            <h2 className="text-xl font-serif font-bold text-[#A0522D] dark:text-[#D4A843] border-b border-[#A0522D]/10 dark:border-[#FAF6F0]/10 pb-3">
              Essential Visitor Guidelines
            </h2>
            <p className="text-xs text-[#2D1B00]/80 dark:text-[#FAF6F0]/75 font-sans leading-relaxed">
              {site.visitorTips}
            </p>
          </div>

        </div>

        {/* Right Side: Sticky Booking Calculator Card (5 cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 bg-[#FAF6F0] dark:bg-[#1C1C1C] border border-[#A0522D]/10 dark:border-[#FAF6F0]/10 rounded-2xl p-6 shadow-md flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[#A0522D]/10 dark:border-[#FAF6F0]/10 pb-4">
            <Calculator className="w-5 h-5 text-[#A0522D] dark:text-[#D4A843]" />
            <h2 className="text-lg font-serif font-bold text-[#2D1B00] dark:text-[#FAF6F0]">
              Tour Calculator
            </h2>
          </div>

          <form onSubmit={handleBookRedirect} className="space-y-4 font-sans text-xs">
            {/* Travel Date */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="widget-date-picker" className="font-bold text-[#A0522D] dark:text-[#D4A843] uppercase tracking-wider text-[10px]">
                Travel Date
              </label>
              <input
                type="date"
                id="widget-date-picker"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF6F0] dark:bg-[#121212] border border-[#A0522D]/20 dark:border-[#FAF6F0]/15 focus:border-[#A0522D] dark:focus:border-[#D4A843] text-[#2D1B00] dark:text-[#FAF6F0] font-semibold focus:outline-none rounded-xl"
              />
            </div>

            {/* Group Size */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="widget-group-size" className="font-bold text-[#A0522D] dark:text-[#D4A843] uppercase tracking-wider text-[10px]">
                Group Size
              </label>
              <input
                type="number"
                id="widget-group-size"
                required
                min={1}
                max={40}
                value={groupSize}
                onChange={(e) => setGroupSize(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#FAF6F0] dark:bg-[#121212] border border-[#A0522D]/20 dark:border-[#FAF6F0]/15 focus:border-[#A0522D] dark:focus:border-[#D4A843] text-[#2D1B00] dark:text-[#FAF6F0] font-semibold focus:outline-none rounded-xl"
              />
            </div>

            {/* Calculations Breakdown */}
            <div className="border-t border-[#A0522D]/10 dark:border-[#FAF6F0]/10 pt-4 space-y-2 text-[#2D1B00]/70 dark:text-[#FAF6F0]/70 font-semibold">
              <div className="flex justify-between">
                <span>Entry Tickets ({groupSize} × {baseTicket} PKR)</span>
                <span>{ticketSubtotal.toLocaleString()} PKR</span>
              </div>
              <div className="flex justify-between">
                <span>Certified Guide Assigned</span>
                <span>{guideSubtotal.toLocaleString()} PKR</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#A0522D] dark:text-[#D4A843] border-t border-[#A0522D]/10 dark:border-[#FAF6F0]/10 pt-2">
                <span>Total PKR estimate</span>
                <span className="font-mono text-base">{totalPKR.toLocaleString()} PKR</span>
              </div>
            </div>

            {/* Book Now Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#D4A843] hover:bg-[#D4A843]/90 text-[#2D1B00] font-sans font-bold text-xs shadow hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </form>
        </div>

      </div>

      {/* 5. Tabs Section below */}
      <section className="w-full mt-10">
        
        {/* Tab Headers */}
        <div className="flex border-b border-[#A0522D]/10 dark:border-[#FAF6F0]/10 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider">
          {['Overview', 'Getting There', 'Reviews', 'AI Recommendations'].map((tab) => {
            const isAct = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-4 sm:px-6 cursor-pointer border-b-2 transition-all ${
                  isAct
                    ? 'border-[#D4A843] text-[#A0522D] dark:text-[#D4A843]'
                    : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-[#2D1B00] dark:hover:text-[#FAF6F0]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Tab Body Contents */}
        <div className="py-6 min-h-[200px]">
          
          {activeTab === 'Overview' && (
            <div className="bg-[#FAF6F0] dark:bg-[#1C1C1C] p-6 border border-[#A0522D]/10 dark:border-[#FAF6F0]/10 rounded-2xl shadow-sm text-xs md:text-sm font-sans text-[#2D1B00]/80 dark:text-[#FAF6F0]/75 leading-relaxed space-y-4">
              <p>{site.description}</p>
              <p>The site belongs to the <strong>{site.civilizationEra}</strong> civilization era. It was constructed and inhabited during the <strong>{site.period}</strong>, representing one of the key milestones in local regional historical records.</p>
            </div>
          )}

          {activeTab === 'Getting There' && (
            <div className="bg-[#FAF6F0] dark:bg-[#1C1C1C] p-6 border border-[#A0522D]/10 dark:border-[#FAF6F0]/10 rounded-2xl shadow-sm text-xs md:text-sm font-sans text-[#2D1B00]/80 dark:text-[#FAF6F0]/75 leading-relaxed space-y-3">
              <h4 className="font-serif font-bold text-[#A0522D] dark:text-[#D4A843] text-sm font-semibold">Transport Routes</h4>
              <p>The monument site is located in the city of <strong>{site.city}</strong>, within the <strong>{site.province}</strong> province. Access is available via primary national highways or rail connections from major city hubs.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>By Air:</strong> Nearest airport is located at {site.city} or surrounding regional capitals.</li>
                <li><strong>By Road:</strong> Paved roads run directly to the ticket reception. Local bus services operate daily.</li>
                <li><strong>Coordinates:</strong> Latitude: {site.lat}, Longitude: {site.lon} for GPS mapping.</li>
              </ul>
            </div>
          )}

          {activeTab === 'Reviews' && (
            <div className="space-y-4">
              {[
                { author: 'Adeel Murtaza', date: 'May 2026', comment: 'An absolutely stunning experience. The stone carvings are incredibly well preserved. Ramps are available at key sites.', stars: 5 },
                { author: 'Sarah Jenkins', date: 'April 2026', comment: 'Loved walking through the ruins. Take an early morning guide so you do not miss the administrative layouts!', stars: 4 },
                { author: 'Mehak Fatima', date: 'March 2026', comment: 'Mind-blowing civil sewage drains for a city built 4500 years ago! Must visit for history buffs.', stars: 5 }
              ].map((rev, index) => (
                <div key={index} className="bg-[#FAF6F0] dark:bg-[#1C1C1C] p-5 border border-[#A0522D]/10 dark:border-[#FAF6F0]/10 rounded-2xl shadow-sm flex flex-col gap-2.5 font-sans">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#2D1B00] dark:text-[#FAF6F0]">{rev.author}</span>
                    <span className="text-stone-400 dark:text-stone-500 font-medium">{rev.date}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < rev.stars ? 'text-[#D4A843] fill-[#D4A843]' : 'text-stone-300 dark:text-stone-700'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-[#2D1B00]/80 dark:text-[#FAF6F0]/75 leading-relaxed">
                    “{rev.comment}”
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'AI Recommendations' && (
            <div className="space-y-6">
              <h4 className="font-serif font-bold text-sm text-[#A0522D] dark:text-[#D4A843] uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#D4A843]" />
                <span>Visitors who liked this also visited...</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarSites.map((site) => (
                  <SiteCard key={site.id} {...site} />
                ))}
              </div>
            </div>
          )}

        </div>

      </section>

      {/* AI Heritage Chatbot */}
      <HeritageChatbot site={site} />

    </div>
  );
}

// Custom internal database mapper representing details details
const siteDatabase = siteData.reduce((acc, current) => {
  acc[current.id] = current;
  return acc;
}, {});
