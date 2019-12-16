import React, { FunctionalComponent } from 'react';
import 'css/pages/Post.scss';
import Plotter, {
  Point,
} from 'components/posts/complex_variables/Plotter.react';

const ComplexVariables: FunctionalComponent = () => (
  <div>
    <div className="post-body">
      <h3>Introduction to Complex Variables</h3>
      <div>
        In college, I took a semester-long course on complex numbers, because I
        thought the whole idea of imaginary numbers was incredible and I wanted
        to understand more. Indeed, complex variables form the backbone of
        quantum mechanics. Unfortunately, I don't think I really understood the
        idea on a very fundamental level. In this post, I hope to visualize some
        of the core concepts in complex variable.
      </div>
      <h3 className="emphasis top">Complex Numbers</h3>
      <div>
        An <i>complex number</i> is a number which can be written{' '}
        <code>c = a + bi</code>, where <code>a</code> and <code>b</code> are
        real numbers and <code>i</code> represents the imaginary unit, which has
        the property <code>i * i = -1</code>. All real numbers can be
        represented as complex numbers. The <i>conjugate</i> of a complex number
        is denoted as{' '}
        <code>
          c<sup>*</sup> = a - bi
        </code>
        , so that the product of a complex number and it's conjugate results in
        a real number, since
      </div>
      <div className="padded top-bottom">
        <div>
          <code>
            c * c<sup>*</sup> = (a + bi) - (a - bi)
          </code>
        </div>
        <div>
          <code>
            c * c<sup>*</sup> = a<sup>2</sup> - (bi)<sup>2</sup>
          </code>
        </div>
        <div>
          <code>
            c * c<sup>*</sup> = a<sup>2</sup> + b<sup>2</sup>
          </code>
        </div>
      </div>
      <div>
        Complex numbers are often represented visually on a two-dimensional
        axis, where the horizontal axis is the real coefficient and the vertical
        axis is the imaginary coefficient. This lends itself to a nice visual
        representation of complex variables, as seen below.
      </div>
      <div className="padded top post-image">
        <Plotter
          funcs={[
            {
              name: 'Conjugate',
              func: (p: Point) => ({
                x: p.x,
                y: -p.y,
              }),
            },
            {
              name: 'Root of Product',
              func: (p: Point) => ({
                x: Math.sqrt(p.x * p.x + p.y * p.y),
                y: 0,
              }),
            },
          ]}
          xLabel="Real"
          yLabel="Imaginary"
        />
      </div>
      <h3 className="emphasis top">Complex Functions</h3>
      <div>
        A <i>complex function</i> is a function from complex numbers to complex
        numbers. A function is <i>holomorphic</i> on some subset of the complex
        plane if it complex differentiable on that subset. For example, the
        function
      </div>
      <div className="padded top-bottom">
        <code>f(x + iy) = (x + y) + i(y - x)</code>
      </div>
      <div>
        is holomorphic over the entire complex plane. This kind of function is
        also called an <i>entire</i> function. Many functions, including
        exponentiation and most trigonometric functions, are holomorphic.
      </div>
      <div className="padded top post-image">
        <Plotter
          funcs={[
            {
              name: '(x + y) + i(y - x)',
              func: (p: Point) => ({
                x: p.x + p.y,
                y: p.y - p.x,
              }),
            },
          ]}
          xLabel="Real"
          yLabel="Imaginary"
        />
      </div>
      <div>The exponential function</div>
      <div className="padded top-bottom">
        <div>
          <code>
            f(z) = e<sup>z</sup>
          </code>
        </div>
        <div>
          <code>
            f(x + iy) = e<sup>x</sup>cos(y) + ie<sup>x</sup>sin(y)
          </code>
        </div>
      </div>
      <div>is also holomorphic.</div>
      <div className="padded top post-image">
        <Plotter
          funcs={[
            {
              name: 'e^z',
              func: (p: Point) => ({
                x: Math.exp(p.x) * Math.cos(p.y),
                y: Math.exp(p.x) * Math.sin(p.y),
              }),
            },
          ]}
          xLabel="Real"
          yLabel="Imaginary"
        />
      </div>
      <div className="padded top">
        There are a lot of functions which are not holomorphic, though. For a
        function to be holomorphic, it has to be complex differentiable, meaning
        that no matter which direction you come at a point, there has to be a
        derivative. This means that the only way a real-valued function can be
        holomorphic is if it's a constant; otherwise, when you come at it from
        the imaginary direction, the derivative wouldn't be defined.
      </div>
      <h3 className="emphasis top">Cauchy–Riemann Equations</h3>
      <div>
        The <b>Cauchy–Riemann Equations</b> tell us when a function is
        holomorphic. A function written as
      </div>
      <div className="padded top-bottom">
        <code>f(x + iy) = u(x, y) + iv(x, y)</code>
      </div>
      <div>is holomorphic if these two conditions are met:</div>
      <div className="padded top-bottom">
        <div>
          <code>du/dx = dv/dy</code>
        </div>
        <div>
          <code>du/dy = -dv/dx</code>
        </div>
      </div>
      <div>Consider the equation below:</div>
      <div className="padded top-bottom">
        <div>
          <code>
            f(z) = e<sup>z</sup>
          </code>
        </div>
        <div>
          <code>
            f(x + iy) = e<sup>x</sup>cos(y) + ie<sup>x</sup>sin(y)
          </code>
        </div>
        <div>
          <code>
            u(x, y) = e<sup>x</sup>cos(y)
          </code>
        </div>
        <div>
          <code>
            v(x, y) = e<sup>x</sup>sin(y)
          </code>
        </div>
      </div>
      <div>Doing a bit of math, we get</div>
      <div className="padded top-bottom">
        <div>
          <code>
            du/dx = e<sup>x</sup>cos(y)
          </code>
        </div>
        <div>
          <code>
            du/dy = -e<sup>x</sup>sin(y)
          </code>
        </div>
        <div>
          <code>
            dv/dx = e<sup>x</sup>sin(y)
          </code>
        </div>
        <div>
          <code>
            dv/dy = e<sup>x</sup>cos(y)
          </code>
        </div>
      </div>
      <div>This indicates that the exponential function is holomorphic.</div>
    </div>
  </div>
);

export default ComplexVariables;
