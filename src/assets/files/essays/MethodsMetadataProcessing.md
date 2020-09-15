# Metadata Processing


[todo: change data repo links once finalized]
Cite as: Gabor M. Toth, <i>In Search of the Drowned, Testimonies and Testimonial Fragments of the Holocaust</i> (Place: Publisher, Year), URL.

The Holocaust testimonies published in this edition were recorded  by a number of different testimony projects (see more about them in the description of each data set in the [Methodology](/methods) section); today these interviews are preserved in three different institutions that have shared the goal of cataloguing them as accurately as possible and making them searchable. To enhance searchability, they enriched their catalogue records with information such as for instance the name of the camp where an interviewee was deported to. Even though the types of information they added to their catalogue records largely overlap (information in catalogue records is named metadata by specialists), the data format they used to record them features differences. This makes the cross-searchability of different testimony collections challenging. 

Consider the following example that demonstrates the different data formats the three institutions applied to record if a person was detained in the Łódź ghetto:

1.Yale Fortunoff Archive: "Łódź ghetto."

2.USHMM: "Jewish ghettos--Poland--Łódź"

3.USC Shoah Foundation: "Łódź (Poland : Ghetto)"

Given that one of the main goals of this edition was to make interviews from these three collections cross-searchable, the computerized processing and the unification of certain metadata categories they added to their catalogue records was first necessary.[[1](#fn-1)]  How the preprocessed and harmonized metadata empowers this project and works in the background is described in the section describing the Technical Specifications. [todo:add link]

As a reader, you can draw on the result of metadata processing and harmonization in the [Testimonies](/explore)  and [Search](/search) sections; there you can browse testimonies and filter them in terms of the following metadata categories:

1.Gender of interviewees

2.Name of the ghettos where interviewees were detained

3.Name of the concentration or death camps where interviewees were deported to

4.Name of the interviewee

5.Year when an interview was recorded

Further metadata provided by the three institutions helped me describe the content of each interview (their summary and title displayed in different sections); metadata is also used to stream the original audio / video recording of each interview from resources existing outside this publication. Finally, information about the historical provenance of certain interviews is displayed with the help of metadata provided by the three institutions. 

In this section I describe the different types of metadata information provided by the three institutions; I also give insights into how original metadata was processed and made compatible with each other, a computerized procedure often called metadata harmonization. 

First, I present the - input -  data format in which each institution provided its metadata. Next, I explain how the different metadata categories mentioned above were processed and harmonized; in case of metadata categories where harmonization was necessary, I also describe the basic rules that I followed to unify the different data formats.

In short, my process of metadata harmonization aimed at making the data shared by the three institutions uniform and cross-searchable; however, it did not aim at improving, correcting or updating the original data that each institution shared with me. The intellectual credit for identifying metadata therefore remains with the staff of each institution, who carefully listened to or watched each interview. Due to the volume of the data, throughout the data processing and the metadata harmonization, I applied only computational approaches, which might have produced sporadic inaccuracies, inconsistencies, and errors. 

Finally, it is important to underline that the computational approach to process and harmonize metadata has its limitations; when these limitations are explicit, I explain them along with the discussion of  the relevant metadata category.

<h2>1. Metadata provided by each institution</h2>

Each institution offered metadata associated with their interviews in different data formats. Since the input data has remained the intellectual property of each institution, it is not downloadable from this website and not available in the repositories archiving the Python code used to process them.

The Yale Fortunoff Archive gave their catalogue records in Marc XML. The Library of Congress offers a good description of this data format: https://www.loc.gov/marc/umb/, accessed, 21 November, 2020.

The United States Holocaust Memorial Museum (USHMM) gave its metadata in JSON (JavaScript Object Notation). JSON as a data interchange standard is presented here: https://www.json.org/json-en.html, accessed, 21 November, 2020.

The USC Shoah Foundation provided its metadata in comma-separated values. The relevant wikipedia entry offers an introduction into this data format to readers not familiar with it: https://en.wikipedia.org/wiki/Comma-separated_values, accessed, 21 November, 2020.

<h2>2. Concentration Camps and Ghettos</h2>

<b>2.1. Concentration camps and ghettos in metadata as provided by each institution</b>

<b>A. Fortunoff Archive</b>

Marc records describe the concentration camp where a person was deported to in the Marc fields 610, 690, 691 in the following format (information shared by the Fortunoff Archive):

"Auschwitz (Concentration camp)"

The Marc records describe the ghetto where a person was detained in the Marc field 690 (information shared by the Fortunoff Archive) in the following format:

"Salonika ghetto"

During the data processing, I focused on these Marc fields, particularly on records containing the sequence of characters, or in technical terms strings,  "(Concentration camp)" and "ghetto."  These strings were computationally identified and removed, which resulted in the following output:

"Auschwitz"

"Salonika"

<b>B. USHMM</b>

The concentration camp where a person was deported to is present in the <i>subject_corporate</i> field (information shared by the USHMM) of the JSON files provided by the USHMM in the following format:

"Gurs (Concentration camp)"

The ghetto where a person was detained is present in the <i>subject_topical</i> field (information shared by the USHMM) of the JSON files provided by the USHMM in the following format:

"Jewish ghettos--Hungary--Budapest."

During the data processing, I computationally studied the content of the <i>subject_corporate </i> field attached to each interview; I identified the relevant concentration camp with the help of the string "(Concentration camp)". As with the Fortunoff Marc records, the string 
"(Concentration camp)" was computationally retrieved and removed, which produced the following output:

"Gurs"

To identify the name of the ghetto where a person was forced to stay, I analyzed the content of the <i>subject_topical</i> field, and I identified the relevant ghetto names with the help of the string "Jewish ghettos". After removing the first two elements of the double dash separated sequence of strings ("Jewish ghettos" and "Hungary" in the example above), I reproduced the name of the ghetto where a person was detained:

"Budapest"

It is important to point out that the exact name of the ghetto where a person was detained is often absent from the records of the USHMM (see for instance, the <i>Oral history interview with Itka Zygmuntowicz</i>, USHMM, RG-50.030*0435), even if the person was detained in a ghetto. The similar can be said about camps. In these cases, I did not attempt to infer these pieces of information from the transcripts or from the interview summaries. 


From <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/interviews_without_ghettos.csv" target="_blank">here</a> you can download a complete list of interviews where the ghetto metadata is not available.

From <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/interviews_without_camps.csv" target="_blank">here</a> you can download a complete list of interviews where the camp metadata is not available.

<b>C. USC Shoah Foundation</b>

In the CSV file provided by the USC Shoah Foundation, the camps where victims were deported are clearly distinguished in a separate data field named <i>camp_names</i>. In their metadata records, the Shoah Foundation also included the geographical location of each concentration camp in the following format:

"Auschwitz II-Birkenau (Poland : Death Camp)"

Ghettos where a person was detained are also present in a distinct data field named <i>ghetto_names</i>; the ghetto records also contain reference to country locations:

"Sighet (Romania : Ghetto)"

Since the country location of concentration camps is not present in the data provided by the Yale Fortunoff Archive and the USHMM, during the data processing this information was identified and computationally eliminated, which produced the following output:

"Auschwitz II-Birkenau"

As the example above shows, the Shoah Foundation recorded both death camps and concentration camps. Since this distinction does not exist in the data provided by the USHMM and the Yale Fortunoff Archive, I disregarded it and treated death camps and concentration camps as one category. 

When processing the ghetto records of the Shoah Foundation, I also removed the country location, which produced the following output:

"Sighet"

<b>2.2. Procedures followed to process and harmonize ghetto and camp names

<b>A. Regularization of orthographic variants of names</b>

Data shared by different institutions often feature orthographical variants of the ghetto and camp names. Consider the following example:

"Litomerice"

"Litoměřice"

"Litoměrice"

The three words all refer to the same town in the Czech Republic; however, the name of this town is present in three different orthographic variants in the metadata provided by the three institutions. In case of conflicting orthographic variants, I usually applied the variant used in the relevant English language wikipedia entry. The resolution of orthographic variants of ghetto names can be found in a CSV file that you can download from <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/camp_variants_resolution_sheet.csv" target="_blank">here</a>. The resolution of camp names can be downloaded from <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/camp_variants_resolution_sheet.csv" target="_blank">here</a>.

<b>B. Regularization of different character variants</b>

Consider the following example:

"Bačka Topola"

"Bačka Topola"

At first glance, the two terms above seem to be the same; they both refer to the same city in the northern part of Serbia. However, from a computational point of view they are not the same. When a text processor compares them, the result will be that they are different. The reason is that the "c" with a hat is actually a different character in the first and the second example. In the first example, it is the combination of an upper apostrophe with C (technically speaking, it is a combining caron (U+030C), see also www.fileformat.info/info/unicode/char/030c/index.htm, accessed 24 November, 2020); in the second example, it is a Latin c with an "inverted hat" (technically speaking, Latin small letter c with caron (U+010D), see also www.fileformat.info/info/unicode/char/010d/index.htm, accessed 24 November, 2020 ). 

The regularization of different character variants aimed at resolving this type of problems. When a given ghetto or camp name was present in the metadata shared by the three institutions with different character variants, I usually followed the variant present in the relevant English language wikipedia entry. See the regularization of character variants in the CSV files linked above. 

<b>C. Inclusion of dash when a camp name is the combination of a city and a suburb

Concentration camps were often located in suburbs of larger cities. The Krakau-Plaszow concentration camp is an example of this. Traditionally, these camps are written with the name of the city, followed first by dash and then by the name of the suburb. However, this pattern is not applied consistently in the metadata shared by the three institutions. For instance, the Krakau-Plaszowconcentration camp is present in three different formats:

-with the city name followed by dash and then by the name of the suburb: "Krakau-Plaszow"

-with the city name followed by a white space and then by the name of the suburb: "Krakau Plaszow"

-only with the name of the suburb without city name: "Plaszow"

To unify these variants, I used the first version, i.e. first the city name, then dash, finally, the name of the suburb.

<b>D. Removal of camp units and the unification of satellite camp and sub-camp names</b>

Sporadically, camp names in the original metadata also contained specific units of camps. For instance, some of the records shared by the three institutions contained the following piece of information:

"Kanada I (Concentration camp)"

Kanada I was not a concentration camp; it was a specific storage facility in Auschwitz unofficially named Kanada. Throughout the metadata harmonization the entry above was replaced with Auschwitz, a practice I applied in other similar cases as well.

A similar problem arose with other types of subunits in camps (specific barracks, sectors, satellite camps, etc). For instance, in some entries, Birkenau, referring to Auschwitz II-Birkenau, occurred in itself. For instance, in the records of the Yale Fortunoff Archive and the USHMM, Auschwitz II-Birkenau sometimes occurs in the following format:

"Birkenau (Concentration camp)"

By contrast, in the records of the USC Shoah Foundation, it is always present in the following format:

"Auschwitz II-Birkenau (Poland : Death Camp);"

I resolved this difference by always including the main camp name followed by the name of the subcamp:

"Auschwitz II-Birkenau"

Or:

"Kaufering Lager III"

<b>E. Unification of the order of names</b>

In the three datasets shared by the three institutions, camp names are sporadically present with constituents in different order. Consider the following example:

"Heinkel-Werke Oranienburg"

"Oranienburg Heinkel-Werke"

"Oranienburg-Heinkelwerke"

I resolved the problem of order by applying the pattern, main geo location (Oranienburg), dash, name of camp or factory (Heinkelwerke).

<b>F. Limitation: resolution of names in different languages</b>

Throughout the data processing, the variants of ghetto and camp names in different languages were not resolved. For this reason, you can sometimes find the same ghetto name in different languages. For instance, the Ukrainian town,  Uzhorod is also present in the data in two variants:

"Ungvár"

And:

"Uzhhorod"

If you do not find a given ghetto, you are advised to search for its name in different languages.

<b>F. Limitation: absence of ghettos and camps from certain records</b>

As mentioned above, not all metadata records shared by the three institutions contain ghetto and camp names. This might indicate that the person was hiding during the war or fled before deportations or the establishment of a ghetto. It might also mean that she or he was forced into forced labour service. Due to the volume and the occasional inconsistencies of the data, it would have been impossible to infer the reason for the absence of camp and ghetto information. However, you can download all interviews where camp and ghetto information were not available:

Interviews without camp information can be downloaded from <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/interviews_without_camps.csv" target="_blank">here</a>.

Interviews without ghetto information can be downloaded from <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/interviews_without_ghettos.csv" target="_blank">here</a>.

<h2>3. Gender</h2>

<b>3.1.Gender information in metadata as provided by each institution</b>

<b>A. Yale Fortunoff Archive</b>

Marc records describe the gender of an interviewee in the Marc field 650  (information shared by the Fortunoff Archive); this field includes links to the relevant subject headings of the Library of Congress (LCSH). 

In case of men, the relevant link is http://id.loc.gov/authorities/subjects/sh85083510.

In case of women, it is http://id.loc.gov/authorities/subjects/sh85147274.

By processing the content of the Marc field 650, I identified the gender of an interviewee. In case of interviews with two or more persons, this was not possible (see for instance, Sylvia B. and Frances G. Holocaust testimony (HVT-4)). 

<b>B. USHMM</b>

The gender of an interviewee has not been added to the catalogue records of the USHMM. This information was therefore inferred computationally through a name database and by analyzing the interview summaries with methods of natural language processing; the gender of each interviewee was then checked manually by a human. If an interview is with multiple persons, the gender information of the interviewees is not available.

<b>C. USC Shoah Foundation</b>

In the CSV file provided by the USC Shoah Foundation, the gender of interviewees was included in a separate data field. Throughout the metadata processing this information was reproduced and taken over.

<b>3.2 Procedures followed to process and harmonize gender</b>

<b>A. Limitation: absence of gender from certain records</b>

The computational approach was unable to infer the gender of every interviewee. By clicking <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/interviews_without_gender_info.csv" target="_blank">here</a>, you can download all interviews where no gender information was identified.

<h2>4. Name of Interviewees</h2>

<b>4.1.Name of interviewees in metadata as provided by each institution</b>

<b>A. Yale Fortunoff Archive</b>

Marc records describe the name of interviewees in the Marc field  100 / A (information shared by the Fortunoff Archive). For the protection of interviewees' privacy, the Marc records do not contain the complete surname of interviewees. For this reason you find only the first letter of each person's surname, i.e. for instance, Eva B. 

During the data processing, interviewees' names were taken over without any further modification or normalization (see also below).

The Yale Fortunoff data contains a number of interviews where multiple interviewees speak. See them in a specific data file that you can download from <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/interviews_with_multiple_interviewees.csv" target="_blank">here</a>.

<b>B. USHMM</b>

Interviewees' names are stored in the <i>interviewee</i> field of the JSON files shared by the USHMM. During the data processing, this field was processed and information from there taken over without any modification.

An important peculiarity of persons' names in the USHMM records is that they occasionally contain honorifics such as for instance Mrs., Mr., and Dr. As a respect for the USHMM catalogue records, these honorifics were not removed from names of interviewees. For example, when searching for "Mr", you will find a number of records.

In case of a handful of USHMM interviews, names of interviewees were not included into the catalogue records. They are therefore not searchable with interviewee names. In this <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/interviews_without_name_of_interviewees.csv" target="_blank">data file</a>, you can find the list of these interviews.

The USHMM data contains interviews where multiple interviewees speak. See them in the data file linked above.

<b>C. USC Shoah Foundation</b>

In the CSV file provided by the USC Shoah Foundation, the names of interviewees are distinguished, during the data processing this field was processed and taken over directly.

The USC Shoah Foundation did not provide interviews with multiple persons.

<b>4.2 Procedures followed to process and harmonize name of interviewees</b>

<b>A. Limitation: name variants not resolved</b>

Interviewees' names were not harmonized; neither were they changed or transformed into a common data format. For this reason, the same person who gave interviews to different interview projects can be present with slightly different name variants. (See for instance, <i>Oral history interview with Itka Zygmuntowicz</i>, USC SHOAH 10588,  and <i>Oral history interview with Itka Zygmuntowicz </i>, USHMM, RG-50.030*0435). 

<b>B. Limitation: absence of surnames</b>

Surnames are not distinguished in the catalogue records; yet, they are completely absent from the Yale Fortunoff Archive data. Name of interviewees are therefore not directly searchable in terms of surnames. The data file that you can download from <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/interviewee_ordered_by_surnames.csv" target="_blank">here</a> contains the list of all interviewees ordered by surnames that I inferred with a computational approach. Since this list was produced with the straight-forward approach of slicing names and using the last element as surname, it might not be completely accurate. 

<h2>5. Shelf Mark of Interviews</h2>

<b>5.1. Shelf mark of interviews in metadata as provided by each institution</b>

<b>A. Yale Fortunoff Archive</b>

The shelf mark of the interview is the unique identifier of the interview in the Yale Libraries catalogue records. It is the permanent identifier that connects this edition with Yale Libraries' records. It was copied from the Marc field 090 B.

<b>B. USHMM</b>

The shelf mark of the interview is the unique identifier of the interview in the USHMM catalogue records. It is the permanent identifier that connects this edition with the USHMM catalogue records. It was copied from the <i>rg_number</i> field in the data shared by the USHMM.

<b>C. USC Shoah Foundation</b>

The shelf mark of the interview is the unique identifier of the interview in the USC catalogue records. It is the permanent identifier that connects this edition with USC records. It was copied from the <i>IntCode</i> field in the data shared by the USC Shoah Foundation. In the collection of the USC Shoah Foundation it is named "interview code."

<h2>6. Media Files (Audio / Video Recording of Testimonies)</h2>

<b>6.1. Media files in metadata as provided by each institution</b>

<b>A. Yale Fortunoff Archive</b>

The media files of testimonies from the Yale Fortunoff Archive are not available in this edition.

<b>B. USHMM</b>

The media files were identified by processing the html data associated with each interview in the JSON files shared by the USHMM. Media content is streamed directly from the website of the USHMM. Some media content is however not available in this edition. In these cases, please contact the USHMM.

<b>C. USC Shoah Foundation</b>

Links to media files were provided by the USC Shoah Foundation; they are streamed from Youtube.

<b>6.2. Procedures followed to process and harmonize media files</b>

<b>A. Limitation: Order of relevant media content</b>

Interviews often contain multiple audio / video media parts; during the data processing, the correct order of interview parts was established, which is then presented on the website. The manual revision of correct order was not possible; hence the ordering of interviews might contain occasional errors.

<h2>7. Recording Year</h2>

<b>7.1. Recording year in metadata as provided by each institution</b>

<b>A. Yale Fortunoff Archive</b>

Marc records describe the recording year in the Marc field  260 / C (information shared by the Fortunoff Archive). 

During the data processing, information in this field was identified and taken over without any modification. 

<b>B. USHMM</b>

The year when an interview was conducted was identified by processing the <i>display_date</i> field (information shared by the USHMM) in the JSON data shared by the USHMM.

In case of some USHMM interviews, it was impossible to infer the recording year; by clicking <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/interviews_without_recording_year.csv" target="_blank">here</a>, you can download the relevant data file containing the list of interviews where no recording year was identified.

<b>C. USC Shoah Foundation</b>

The year when an interview was conducted is present in the CSV file provided by the USC Shoah Foundation.

<b>7.2. Procedures followed to process and harmonize recording year</b>

<b>A. Limitation: disregarding complete dates</b>

While in some shared records the complete recording date (day, month, and year) of an interview  is available, in others only the year is present. I therefore focused only on years, which are present in each data set. 

<h2>8. Provenance</h2>

<b>8.1. Provenance in metadata as provided by each institution</b>

<b>A. Yale Fortunoff Archive</b>

Marc records describe the provenance in the Marc field  260 / B (information shared by the Fortunoff Archive). 

During the data processing, information in this field was processed and taken over. The provenance of all Fortunoff interviews is the Holocaust Survival Film Project (see further description of this in the [section](/methods) section) presenting the Fortunoff interviews).

<b>B. USHMM</b>

The provenance of the USHMM interviews was taken from the <i>historical_provenance</i> field of the JSON input files. The difference between the USHMM interviews from the two other collections is that the USHMM interviews feature a high number of different provenances. (see further description of this in the [section](/methods) presenting the USHMM interviews).

<b>C. USC Shoah Foundation</b>

Detailed provenance information was not given by the USC Shoah Foundation. Hence this information is missing from the USC testimonies in this edition.

<h2>9. Testimony Title</h2>

<b>9.1. Testimony title in metadata as provided by each institution</b>

<b>A. Yale Fortunoff Archive</b>

Marc records describe the title of each testimony in the Marc field  245 / A (information shared by the Fortunoff Archive). During the data processing this information was taken over.

<b>B. USHMM</b>

The title of the USHMM interviews was taken from the <i>title</i> field of the JSON files shared by the USHMM.

<b>C. USC Shoah Foundation</b>

The metadata provided by the USC Shoah Foundation included a record containing the testimony title.

<b>9.2. Procedures followed to process and harmonize media content</b>

<b>A. Limitation: testimony title harmonization</b>

Testimony titles were not harmonized; they were taken over from the original catalogue records without any modification. From <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/all_interviews_with_titles_shelfmarks.csv" target="_blank">here</a> you can download the list of all testimonies and their respective titles.

<h2>10. Interview Summary</h2>

<b>10.1. Interview summary in metadata as provided by each institution</b>

<b>A. Yale Fortunoff Archive</b>

Marc records describe the summary of each testimony in the Marc field  520 / A (information shared by the Fortunoff Archive). 

<b>B. USHMM</b>

The summaries of the USHMM interviews were taken from the <i>interview_summary</i> field of the JSON input files. 

<b>C. USC Shoah Foundation</b>

The metadata provided by the USC Shoah Foundation did not include summaries of their interviews.

<b>10.2. Procedures followed to process and harmonize interview summary</b>

<b>A. Limitation: interview summary harmonization</b>

Interview summaries were not harmonized; spelling and name variants were not harmonized. Neither were their content and accuracy controlled.

<p id="fn-1" class="footnote">1. The Python code used to process and harmonize metadata is archived in this repository: https://github.com/YaleDHLab/shoah-foundation-data. </p>
