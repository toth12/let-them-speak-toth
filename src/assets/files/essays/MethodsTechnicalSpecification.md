# Technical Specifications


[todo: change data repo links once finalized]
Cite as: Gabor M. Toth, <i>In Search of the Drowned, Testimonies and Testimonial Fragments of the Holocaust</i> (Place: Publisher, Year), URL.

This project is built upon a purpose-built digital platform developed in collaboration with the Yale Digital Humanities Laboratory and the Yale Fortunoff Video Archive for Holocaust Testimonies. The digital platform is running as a standalone and self-contained application empowered by Docker technology (see, https://www.docker.com/) and the Alpine Linux distribution (see, https://alpinelinux.org/); behind this website there are three dockerized Alpine Linux servers (technically speaking Docker containers) that incorporate all textual content, as well as the pre-compiled and ready-to-use data (testimonial fragments, linguistically annotated transcripts and preprocessed and harmonized metadata). The code to run the docker containers are available in this repository: https://github.com/jakekara/lts-cloud/issues. The digital platform has two backend components and a javascript based frontend.

The first backend component is an open source corpus engine, BlackLab (see,  http://inl.github.io/BlackLab/). BlackLab is a Java based application built on the top of Apache Lucene (see, https://lucene.apache.org/); it has been developed by the Dutch Language Institute. BlackLab is a very robust and well-tested engine that can serve many users at the same time; it can deliver the computing power needed to run live search in an extremely large corpora. It facilitates complex textual searches (REGEX, CQL, sequence and pattern matching, etc) in large linguistically annotated corpora and also functions as a state-of-art concordancer. The strength of BlackLab lies in the fact that it enables the combination of complex textual searches with metadata. The digital platform underlying the proposed publication also uses BlackLab Server (see, http://inl.github.io/BlackLab/blacklab-server-overview.html), which offers a REST interface to communicate with the BlackLab Engine. The REST interface is empowered by an Apache Tomcat Server (see, http://tomcat.apache.org/). Both the BlackLab engine and the Tomcat server are built into the digital platform, i.e. incorporated into the Docker containers.

The second component of the backend is a Mongo Database (see, https://www.mongodb.com/). This stores testimony metadata, transcripts in HTML, and the input data to the hierarchical tree visualization of the collective experience; it also stores an index that connects linguistic data in the BlackLab Engine with transcripts in HTML. Data in the Mongo Database enables browsing, faceting, and rendering testimonies at the frontend. 

The frontend of the digital platform uses the React/ Redux javascript framework (see, https://react-redux.js.org/); this communicates with the two backend components with the help of Python Flask (see, https://flask.palletsprojects.com/) framework. The hierarchical tree visualization of testimonial fragments is realized with the help of D3J (see, https://d3js.org/). Code running the frontend is stored in this <a href="https://github.com/YaleDHLab/let-them-speak/" target="_blank">repository</a>.