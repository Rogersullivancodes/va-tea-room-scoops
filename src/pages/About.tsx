
import React from 'react';
import { Users, Award, Eye, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  const team = [
    {
      name: "Sarah Mitchell",
      role: "Editor-in-Chief",
      bio: "Former Washington Post political correspondent with 15 years covering Virginia politics."
    },
    {
      name: "Mike Rodriguez",
      role: "Investigative Reporter",
      bio: "Award-winning journalist specializing in government accountability and transparency."
    },
    {
      name: "Jessica Chen",
      role: "Digital Director",
      bio: "Tech-savvy storyteller bringing political news to the digital age."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-700 to-slate-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About CrabsFriedPolitically
              </h1>
              <p className="text-xl leading-relaxed">
                Virginia's premier source for unfiltered political news, analysis, and the stories 
                that matter most to the Old Dominion State.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Target className="h-12 w-12 text-red-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      To serve Virginia citizens with transparent, accurate political reporting 
                      that holds power accountable.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <Eye className="h-12 w-12 text-red-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      An informed Virginia where every citizen has access to the political 
                      truth they need to make decisions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <Award className="h-12 w-12 text-red-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">Our Values</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Independence, accuracy, fairness, and a commitment to serving 
                      the public interest above all else.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Why "CrabsFriedPolitically"?
                </h2>
                <div className="max-w-4xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p className="mb-4">
                    Like Maryland's famous crab cakes, Virginia politics can be messy, complex, 
                    and sometimes hard to digest. But when done right, it's essential and satisfying. 
                    We take the raw ingredients of political news and serve them up in a way that's 
                    both palatable and nutritious for democracy.
                  </p>
                  <p>
                    The "fried" part? Sometimes the truth can be uncomfortable - we're not afraid 
                    to turn up the heat when necessary to expose what's really cooking in Virginia's 
                    political kitchen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Meet Our Team
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Experienced journalists dedicated to Virginia political coverage
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {team.map((member, index) => (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <div className="w-24 h-24 bg-red-100 dark:bg-red-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-12 w-12 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {member.name}
                      </h3>
                      <p className="text-red-600 font-semibold mb-3">{member.role}</p>
                      <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-red-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Have a Story for Us?</h2>
            <p className="text-xl mb-8">
              We're always looking for tips, leads, and stories that matter to Virginians.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-white text-red-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Contact Our Newsroom
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
