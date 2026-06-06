export const getMockReviews = () => {
  return [
    {
      id: 1,
      reviewer: "Liz W",
      rating: 5,
      date: "March 2026",
      location: "United Kingdom",
      title: "Fantastic driver and lovely person",
      text: "We were so lucky to have Kamal as our driver guide. From the moment he picked us up from Negombo, to when he dropped us off in Tangalle a week later, we couldn't have asked for a nicer person to help us make the most of our travels in Sri Lanka. We were a party of 3 females (1 x 60+, 2x 20+) and he was always kind, courteous and attentive, helpfully adding suggestions to our plans and providing lots of knowledge about the flora, fauna and cultural life of the different areas we visited. He was also a very calm and capable driver, driving responsibly and making us feel safe and secure. His car is very comfortable and provides a very smooth ride. We were very sorry to say goodbye to him in Tangalle as he really felt a special part of our holiday! Please feel confident to book Kamal as your driver, he is a true gentleman whom you can totally rely on to provide an excellent service.",
      tour: "Custom Sri Lanka Tour",
      platform: "TripAdvisor",
      contributions: "2 contributions"
    },
    {
      id: 2,
      reviewer: "Jula N",
      rating: 5,
      date: "February 2026",
      location: "Germany",
      title: "If You Need a Driver in Sri Lanka – This Is Your Guy!",
      text: "If you're looking for a driver in Sri Lanka, honestly—stop searching, you've just found the one. From day one, Kamal was everything you could hope for and more: always on time (actually, usually early!), super reliable, and just genuinely kind. We felt completely safe and taken care of throughout the whole trip, which makes such a difference when you're traveling in a new country. But what really made the experience special was Kamal as a person. Always smiling, always calm, never any problems—just good vibes all the way. He didn't just drive us from A to B; he shared tips, local insights, stories about history, culture, and religion that you simply won't find in any guidebook. Need a good restaurant? He knows. Hidden spots? He knows. Want to understand what you're actually seeing? He'll explain it in a way that's interesting and easy to follow. And the best part? He does it all with such a relaxed, friendly attitude that you feel like you're traveling with someone you've known for years. 100% recommended. If we ever come back to Sri Lanka, we wouldn't even consider anyone else. Thanks for great trip Kamal. All the best. Julia and Maria xx",
      tour: "Custom Sri Lanka Tour",
      platform: "TripAdvisor",
      contributions: "5 contributions"
    },
    {
      id: 3,
      reviewer: "Michelle R",
      rating: 5,
      date: "January 2026",
      location: "United Kingdom",
      title: "Incredible trip with an even better tour guide/driver",
      text: "We had an incredible experience with Kamal. He was so friendly, kind, and genuinely caring making us feel completely at ease. The trip was seamless and stress-free thanks to his professionalism and thoughtful attention to detail. We loved having the flexibility to choose what we wanted to do and when, while still benefiting from his fantastic suggestions that truly enhanced our experience. He went above and beyond and made the whole journey so easy and enjoyable—we couldn't recommend him more highly! Thank you Kamal!",
      tour: "Custom Sri Lanka Tour",
      platform: "TripAdvisor",
      contributions: "4 contributions"
    },
    {
      id: 4,
      reviewer: "Stay51790330359",
      rating: 5,
      date: "December 2025",
      location: "United Kingdom",
      title: "Sri Lanka with Kamal",
      text: "I have just spent 10 days touring around Sri Lanka with Kamal as our driver and guide. Alongside being a brilliant driver, always on time and calm on sometimes busy roads Kamal has a wide ranging knowledge and passion for Sri Lanka. From history, religion to customs, food and topography Kamal knew so much. We also had great fun on the journey and were really sad to say goodbye. I would highly recommend Kamal for your trip to Sri Lanka",
      tour: "10-Day Sri Lanka Tour",
      platform: "TripAdvisor",
      contributions: "3 contributions"
    },
    {
      id: 5,
      reviewer: "Bevan A",
      rating: 5,
      date: "November 2025",
      location: "Australia",
      title: "Unforgettable Sri Lanka Tour with Exceptional Service",
      text: "An amazing experience and the perfect way to see the very best of Sri Lanka. Kamal was an incredibly patient, informative, and professional driver throughout our tour. He helped us make the most of every day, ensuring we saw as much as possible while always catering to our needs. If you are planning a trip to beautiful Sri Lanka, I highly recommend Insi Tours — they are absolutely the way to go!",
      tour: "Custom Sri Lanka Tour",
      platform: "TripAdvisor",
      contributions: "5 contributions"
    },
    {
      id: 6,
      reviewer: "Benjamin K",
      rating: 5,
      date: "October 2025",
      location: "London, United Kingdom",
      title: "Feedback on Kamal",
      text: "Kamal acted as guide and driver whilst we were in Sri Lanka. He drove well, was punctual and knew all the best sites and restaurants to go to. He was also kind and good company. He is very experienced and knows Sri Lanka well. Highly recommended",
      tour: "Custom Sri Lanka Tour",
      platform: "TripAdvisor",
      contributions: "23 contributions"
    }
  ];
};

// Since we can't fetch directly, we'll use mock data with widget integration
export const fetchTripAdvisorReviews = async () => {
  // Return mock data - the widget will show the actual TripAdvisor content
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockReviews());
    }, 500);
  });
};