
# Pokesnap

AI powered pokemon recognition app. Bringing the Pokedex from the tv show and the games to life!


## Demo

https://github.com/Jawny/pokesnap/assets/35911590/c27cd99f-080f-45e4-a559-8dfe3c6bfc0c


## Training Process and Transfer Learning
As an avid Pokemon fan, I embarked on the journey of building my own digital Pokedex, for the original 151 Pokemon, starting with the development of a functional image classification model using a Convolutional Neural Network (CNN). To train my model, I obtained a [dataset](https://www.kaggle.com/datasets/lantian773030/pokemonclassification) from Kaggle consisting of 7000 labeled Pokemon images. However, training with such a small dataset could lead to sampling bias and overfitting issues.

To address these challenges and make my dataset more robust without manually downloading thousands of additional images, I employed data processing techniques. I developed a simple Python script that applied various transformations to the images, including greyscaling, rotating, and flipping. By augmenting the dataset with these modified versions, I was able to expand it to a substantial 21000 images.

Next, instead of building a neural network from scratch, I opted for transfer learning. This approach allows leveraging the knowledge captured by pre-trained models in solving similar tasks. By fine-tuning the VGG19 model and modifying the output layer to match the number of Pokemon classes I wanted to classify, I adapted it to recognize Pokemon species.

Check out the code [here](https://github.com/Jawny/pokemon-cnn)
## Mobile Development
When developing Pokesnap I chose to use the Ionic framework and React to provide a cross platform experience for both mobile and web users. One of the key features I wanted was to be able to classify Pokemon without an internet connection. I used Tensorflow.js to load the CNN model directly on the user's device so the app can run predictions locally, eliminating the need for continuous network connectivity and ensuring smooth functionality regardless of the user's location.


## Future Development
In terms of future development for Pokesnap, there are two areas I would like to focus on: expanding the dataset to include more than the original 151 Pokemon and conducting comprehensive benchmarks to evaluate the model's accuracy and performance.
